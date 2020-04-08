pipeline {
  agent none
  options {
    parallelsAlwaysFailFast()
    timeout(time: 60, unit: 'MINUTES')
  }
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
    stage('Test') {
      parallel {
        stage('Validate JSON') {
          agent {
            docker 'node'
          }
          steps {
            unstash 'node_modules'
            sh 'node src/json/validate.js'
          }
        }
      }
    }
    stage('Deploy dev') {
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
    stage('Deploy tst') {
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
    stage('Validate tst') {
      steps {
        input message: 'Was the tst deployment successful?'
      }
    }
    stage('Deploy acc') {
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
    stage('Validate acc') {
      steps {
        input message: 'Was the acc deployment successful?'
      }
    }
    stage('Deploy prd') {
      when {
        branch 'master'
      }
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
    stage('Validate prd') {
      when {
        branch 'master'
      }
      steps {
        input message: 'Was the prd deployment successful?'
      }
    }
  }
  post {
    failure {
      // https://jenkins.io/doc/pipeline/tour/post/
      // http://localhost:49001/pipeline-syntax/globals
      echo 'Something failed. Could send a notification with information now.'
    }
  }
}
