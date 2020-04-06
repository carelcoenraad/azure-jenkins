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
          sh 'node src/event-hubs/send.js'
        }
      }
    }
    stage('Storage') {
      agent {
        docker 'node'
      }
      environment {
        AZURE_STORAGE_ACCOUNT_NAME = credentials('azure-storage-account-name')
        AZURE_STORAGE_ACCOUNT_KEY = credentials('azure-storage-account-key')
      }
      steps {
        sh 'npm install --production'
        sh 'node src/storage/blob.js'
      }
    }
  }
}
