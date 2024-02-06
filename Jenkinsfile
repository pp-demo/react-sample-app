pipeline {
    agent any

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
                    // Authenticate with AWS ECR using AWS credentials
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'AWS_JENKINS_ACCESS_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        // Use docker.withRegistry to push the Docker image to ECR
                        docker.withRegistry('https://' + registry, 'aws') {
                            // Push the Docker image to ECR
                            sh "docker push ${image}"
                        }
                    }
                }
            }
        }
    }
}
