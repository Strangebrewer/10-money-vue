
pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm i'
                sh 'npm start'
                sh 'echo "Fiddle sticks!"'
            }
        }
    }
}