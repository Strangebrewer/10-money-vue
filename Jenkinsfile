pipeline {
    agent any
    environment {
        NODE_ENV = 'derptown'
    }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
                sh 'npm i'
                sh 'npm start'
                sh 'echo "Fiddle sticks!"'
            }
        }
    }
}