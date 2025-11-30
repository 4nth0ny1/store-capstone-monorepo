pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    tools {
        // These names MUST match what you configured in Global Tool Configuration
        maven  'Maven3'
        nodejs 'Node18'
    }

    environment {
        BACKEND_DIR  = 'backend'
        FRONTEND_DIR = 'frontend'
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend - Build & Test') {
            steps {
                dir("${BACKEND_DIR}") {
                    // -B = batch mode (better for CI logs)
                    sh 'mvn -B clean test'
                }
            }
            post {
                always {
                    // Publish JUnit test results so Jenkins shows them nicely
                    junit "${BACKEND_DIR}/target/surefire-reports/*.xml"
                }
            }
        }

        stage('Frontend - Install & Build') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Compose - Build Images') {
            steps {
                sh "docker compose -f ${COMPOSE_FILE} build"
            }
        }

        stage('Docker Compose - Smoke Test') {
            steps {
                // Start the stack
                sh "docker compose -f ${COMPOSE_FILE} up -d"

                // Give backend time to come up
                sh 'sleep 20'

                // Simple health check against backend
                sh '''
                    set -e
                    echo "Running smoke test against backend..."
                    curl -f http://localhost:8080/api/products || {
                        echo "Smoke test failed!"
                        exit 1
                    }
                '''
            }
        }
    }

    post {
        always {
            // Bring containers down so the agent stays clean
            sh "docker compose -f ${COMPOSE_FILE} down || true"
        }
    }
}
