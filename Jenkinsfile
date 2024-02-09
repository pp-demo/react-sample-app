pipeline {
    agent any

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch to build')
    }

    environment {
        registry = "211125474443.dkr.ecr.ecr.eu-north-1.amazonaws.com"
        image = "${registry}/react-sample-app"
    }

    stages {
        stage('Install Docker') {
            steps {
                script {
                    sh '''
                    sudo apt-get update
                    sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
                    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
                    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
                    sudo apt-get update
                    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
                    '''
                }
            }
        }

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
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: '832ef773-e909-4a43-8302-9bc20b298145']]) {
                        docker.withRegistry('https://${registry}') {
                            def appImage = docker.build("${image}:${env.GIT_COMMIT}")
                            appImage.push()
                        }
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