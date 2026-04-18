pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/Mitali75/Food-Ordering-Website.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t food-ordering-app .'
            }
        }

        stage('Remove Old Container') {
            steps {
                bat 'docker rm -f food-ordering-container || exit /b 0'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat 'docker run -d --name food-ordering-container -p 3000:3000 food-ordering-app'
            }
        }
    }
}