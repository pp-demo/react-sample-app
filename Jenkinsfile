pipeline {
  agent {
    kubernetes {
      label 'dind'
      defaultContainer 'docker'
      yaml '''
---
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: jenkins
spec:
  containers:
    - name: docker
      image: docker:latest
      command:
        - /bin/cat
      tty: true
      volumeMounts:
        - name: dind-certs
          mountPath: /certs
      env:
        - name: DOCKER_TLS_CERTDIR
          value: /certs
        - name: DOCKER_CERT_PATH
          value: /certs
        - name: DOCKER_TLS_VERIFY
          value: 1
        - name: DOCKER_HOST
          value: tcp://localhost:2376
    - name: dind
      image: docker:dind
      securityContext:
        privileged: true
      env:
        - name: DOCKER_TLS_CERTDIR
          value: /certs
      volumeMounts:
        - name: dind-storage
          mountPath: /var/lib/docker
        - name: dind-certs
          mountPath: /certs/client
  volumes:
    - name: dind-storage
      emptyDir: {}
    - name: dind-certs
      emptyDir: {}
'''
    }
  }

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch to build')
    }

    environment {
        registry = '211125474443.dkr.ecr.ecr.eu-north-1.amazonaws.com'
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

        stage('Build Docker image') {
      steps {
        script {
          withAWS(region: 'eu-north-1', credentials: 'AWS_JENKINS_CRED') {
            sh "docker build -t ${image}:${env.GIT_COMMIT} ."
            sh "aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin ${registry}"
            sh "docker push ${image}:${env.GIT_COMMIT}"
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
