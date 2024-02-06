pipeline {
    agent any

    environment {
        registry = "<aws_account_id>.dkr.ecr.<region>.amazonaws.com"
        image = "${registry}/<repository_name>:${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    sh "docker build -t ${image} ."
                }
            }
        }

        stage('Push Docker image to ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin ${registry}"
                    sh "docker push ${image}"
                }
            }
        }
    }
}