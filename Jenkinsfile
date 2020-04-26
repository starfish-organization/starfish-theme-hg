pipeline {
    agent {
        docker {
            image 'node:12.14.0-stretch'
        }
    }
    triggers {
        pollSCM('*/1 * * * *')
    }
    environment {
        CI = 'true'
        HOME = '.'
    }
    stages {
        stage('Npm install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test:ci'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Build ssr') {
            steps {
                sh 'npm run build:ssr'
            }
        }
    }
    post {
        always {
            rocketSend currentBuild.currentResult
        }
    }
}
