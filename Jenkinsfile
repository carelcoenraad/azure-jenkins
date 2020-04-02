pipeline {
    agent none
    stages {
        stage('Version') {
            agent {
                docker 'mcr.microsoft.com/azure-cli'
            }
            steps {
                sh 'az --version'
            }
        }
    }
}
