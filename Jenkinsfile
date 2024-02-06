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
                    docker.withRegistry('https://${registry}', 'ecr:eu-north-1:AWS_JENKINS_ACCESS_ID') {
                        def appImage = docker.build(image)
                        appImage.push()
                    }
                }
            }
        }
    }
}