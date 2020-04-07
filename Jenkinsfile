// TODO: Add failure notifications
pipeline {
  agent none
  stages {
    stage('Install') {
      agent {
        docker 'node'
      }
      steps {
        sh 'npm install --production'
        stash includes: 'node_modules/**', name: 'node_modules'
      }
    }
    stage('Deploy to dev') {
      parallel {
        stage('Send events') {
          agent {
            docker 'node'
          }
          environment {
            AZURE_EVENT_HUBS_CONNECTION_STRING = credentials('azure-event-hubs-connection-string')
            AZURE_EVENT_HUBS_EVENT_HUB_NAME = credentials('azure-event-hubs-event-hub-name-dev')
          }
          steps {
            unstash 'node_modules'
            sh 'node src/event-hubs/send.js'
          }
        }
        stage('Upload files') {
          agent {
            docker 'node'
          }
          environment {
            AZURE_STORAGE_ACCOUNT_NAME = credentials('azure-storage-account-name')
            AZURE_STORAGE_ACCOUNT_KEY = credentials('azure-storage-account-key')
            AZURE_STORAGE_CONTAINER_NAME = credentials('azure-storage-container-name-dev')
          }
          steps {
            unstash 'node_modules'
            sh 'node src/storage/blob.js'
          }
        }
      }
    }
    // TODO: Add Validate dev stage
    stage('Deploy to tst') {
      parallel {
        stage('Send events') {
          agent {
            docker 'node'
          }
          environment {
            AZURE_EVENT_HUBS_CONNECTION_STRING = credentials('azure-event-hubs-connection-string')
            AZURE_EVENT_HUBS_EVENT_HUB_NAME = credentials('azure-event-hubs-event-hub-name-tst')
          }
          steps {
            unstash 'node_modules'
            sh 'node src/event-hubs/send.js'
          }
        }
        stage('Upload files') {
          agent {
            docker 'node'
          }
          environment {
            AZURE_STORAGE_ACCOUNT_NAME = credentials('azure-storage-account-name')
            AZURE_STORAGE_ACCOUNT_KEY = credentials('azure-storage-account-key')
            AZURE_STORAGE_CONTAINER_NAME = credentials('azure-storage-container-name-tst')
          }
          steps {
            unstash 'node_modules'
            sh 'node src/storage/blob.js'
          }
        }
      }
    }
    // TODO: Add Validate tst stage
    stage('Deploy to acc') {
      parallel {
        stage('Send events') {
          agent {
            docker 'node'
          }
          environment {
            AZURE_EVENT_HUBS_CONNECTION_STRING = credentials('azure-event-hubs-connection-string')
            AZURE_EVENT_HUBS_EVENT_HUB_NAME = credentials('azure-event-hubs-event-hub-name-acc')
          }
          steps {
            unstash 'node_modules'
            sh 'node src/event-hubs/send.js'
          }
        }
        stage('Upload files') {
          agent {
            docker 'node'
          }
          environment {
            AZURE_STORAGE_ACCOUNT_NAME = credentials('azure-storage-account-name')
            AZURE_STORAGE_ACCOUNT_KEY = credentials('azure-storage-account-key')
            AZURE_STORAGE_CONTAINER_NAME = credentials('azure-storage-container-name-acc')
          }
          steps {
            unstash 'node_modules'
            sh 'node src/storage/blob.js'
          }
        }
      }
    }
    // TODO: Add Validate acc stage
    stage('Deploy to prd') {
      parallel {
        stage('Send events') {
          agent {
            docker 'node'
          }
          environment {
            AZURE_EVENT_HUBS_CONNECTION_STRING = credentials('azure-event-hubs-connection-string')
            AZURE_EVENT_HUBS_EVENT_HUB_NAME = credentials('azure-event-hubs-event-hub-name-prd')
          }
          steps {
            unstash 'node_modules'
            sh 'node src/event-hubs/send.js'
          }
        }
        stage('Upload files') {
          agent {
            docker 'node'
          }
          environment {
            AZURE_STORAGE_ACCOUNT_NAME = credentials('azure-storage-account-name')
            AZURE_STORAGE_ACCOUNT_KEY = credentials('azure-storage-account-key')
            AZURE_STORAGE_CONTAINER_NAME = credentials('azure-storage-container-name-prd')
          }
          steps {
            unstash 'node_modules'
            sh 'node src/storage/blob.js'
          }
        }
      }
    }
    // TODO: Add Validate prd stage
  }
}
