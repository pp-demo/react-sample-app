pipeline {
    agent {
        node {
            label 'main-worker'
        }
    }

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch to build')
    }

    environment {
        registry = "211125474443.dkr.ecr.ecr.eu-north-1.amazonaws.com"
        image = "${registry}/react-sample-app"
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

        stage('Setup Docker') {
            steps {
                script {
                    sh 'service docker start || systemctl start docker'
                    sh 'DOCKER_BUILDKIT=1'
                    sh 'docker buildx install'
                }
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    withAWS(region: 'eu-north-1', credentials: 'AWS_JENKINS_CRED') {
                        def appImage = docker.build("${image}:${env.GIT_COMMIT}")
                        sh "aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin ${registry}"
                        appImage.push()
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build and push to ECR succeeded.'
        }
        failure {
            echo 'Build or push to ECR failed.'
        }
    }
}