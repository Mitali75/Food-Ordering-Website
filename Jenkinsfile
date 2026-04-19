pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t food-ordering-app .'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh 'docker rm -f food-ordering-container || true'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d --name food-ordering-container -p 3000:3000 food-ordering-app'
            }
        }
    }
}