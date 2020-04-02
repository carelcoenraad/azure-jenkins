pipeline {
  agent none
  stages {
    stage('Event Hubs') {
      agent {
        docker 'node'
      }
      environment {
        AZURE_EVENT_HUBS_CONNECTION_STRING = credentials('azure-event-hubs-connection-string')
        AZURE_EVENT_HUBS_EVENT_HUB_NAME = credentials('azure-event-hubs-event-hub-name')
      }
      steps {
        withCredentials([azureServicePrincipal('cicd')]) {
          sh 'npm install --production'
          sh 'node event-hubs/send.js'
        }
      }
    }
  }
}
