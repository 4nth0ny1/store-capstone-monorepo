pipeline {
    agent any

    tools {
        // Make sure these names match the tools you configured in Jenkins
        maven  'Maven3'
        nodejs 'Node18'
    }

    environment {
        // Just to keep things explicit
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
                    sh 'mvn clean test'
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
                // Bring up the stack
                sh "docker compose -f ${COMPOSE_FILE} up -d"

                // Give the backend a moment to start
                sh 'sleep 20'

                // Simple health check: hit the products endpoint
                sh '''
                    set -e
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
            // Always tear down containers so Jenkins agent stays clean
            sh "docker compose -f ${COMPOSE_FILE} down || true"
        }
    }
}
