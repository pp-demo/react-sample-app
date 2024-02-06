pipeline {
   agent {
        docker { image 'node:20.11.0-alpine3.19' }
    }

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch to build')
    }

    environment {
        registry = "211125474443.dkr.ecr.ecr.eu-north-1.amazonaws.com"
        image = "${registry}/react-sample-app:${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout the specified branch
                    checkout([$class: 'GitSCM', branches: [[name: "*/${params.BRANCH}"]], userRemoteConfigs: [[url: 'https://github.com/pp-demo/react-sample-app']]])
                }
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
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'AWS_JENKINS_ACCESS_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        sh "aws ecr get-login-password --region ecr.eu-north-1 | docker login --username AWS --password-stdin ${registry}"
                    }
                    sh "docker push ${image}"
                }
            }
        }
    }
}
