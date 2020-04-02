pipeline {
    agent none
    stages {
        stage('Event Hubs') {
            agent {
                docker 'node'
            }
            steps {
                withCredentials([azureServicePrincipal('cicd')]) {
                    sh 'node event-hubs/send.js'
                }
            }
        }
    }
}
