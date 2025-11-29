pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
                sh 'ls -R'
            }
        }

        stage('Backend - Build & Test') {
            steps {
                dir('backend') {
                    echo 'Running backend Maven build (clean verify)...'
                    sh 'chmod +x mvnw || true'
                    sh './mvnw -B clean verify'
                }
            }
        }

        stage('Frontend - Install & Build') {
            steps {
                dir('frontend') {
                    echo 'Installing frontend dependencies...'
                    sh '''
                    if [ -f package-lock.json ]; then
                      npm ci
                    else
                      npm install
                    fi
                    '''
                    echo 'Building frontend (Vite)...'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build Images') {
            steps {
                echo 'Building Docker images for backend and frontend...'
                sh 'docker build -t store-backend:latest ./backend'
                sh 'docker build -t store-frontend:latest ./frontend'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the logs for more details.'
        }
        always {
            echo 'Jenkins pipeline finished (success or failure).'
        }
    }
}
