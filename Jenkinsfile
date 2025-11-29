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
                    echo 'Cleaning old node_modules and lockfile (Jenkins Linux env)...'
                    sh '''
                    rm -rf node_modules package-lock.json
                    npm install
                    npm run build
                    '''
                }
            }
        }

        stage('Docker Build Images') {
            steps {
                echo 'Building Docker images for backend and frontend (if docker is available)...'
                sh '''
                if command -v docker >/dev/null 2>&1; then
                echo "Docker CLI found. Building images..."
                docker build -t store-backend:latest ./backend
                docker build -t store-frontend:latest ./frontend
                else
                echo "Docker CLI not found in Jenkins agent. Skipping Docker image build."
                fi
                '''
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
