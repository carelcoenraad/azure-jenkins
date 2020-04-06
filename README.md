# Azure/Jenkins

Demonstrate the usage of Azure in a Jenkins pipeline.

## Getting Started

### Prerequisites

- Azure account
- Docker
- Node (LTS or newer)
- NPM

### Configure Environment

Create a `.env` file and adjust the configuration accordingly

```bash
# Event hubs
AZURE_EVENT_HUBS_CONNECTION_STRING=
AZURE_EVENT_HUBS_EVENT_HUB_NAME=

# Storage
AZURE_STORAGE_ACCOUNT_NAME=
AZURE_STORAGE_ACCOUNT_KEY=
```

### Running

Run the following commands to verify the setup:

```bash
# Send events to an event hub
node src/event-hubs/send.js

# Create a storage container and upload a blob
node src/storage/blob.js
```

## Setting Up Jenkins

This is a summary of [this](https://jenkins.io/doc/tutorials/build-a-node-js-and-react-app-with-npm/) more extensive tutorial.
The commands are for macOS/Linux based systems.
Checkout the extensive tutorial for the Windows commands.

### Configure Docker

Create a bridge network and storage volumes

```bash
docker network create jenkins
docker volume create jenkins-docker-certs
docker volume create jenkins-data
```

Run a Docker container that allows Docker containers to run inside of Jenkins

```bash
docker container run --name jenkins-docker --rm --detach --privileged --network jenkins --network-alias docker --env DOCKER_TLS_CERTDIR=/certs --volume jenkins-docker-certs:/certs/client --volume jenkins-data:/var/jenkins_home --volume "$HOME":/home docker:dind
```

Run a Docker container with Jenkins

```bash
docker container run --name jenkins --rm --detach --network jenkins --env DOCKER_HOST=tcp://docker:2376 --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 --volume jenkins-data:/var/jenkins_home --volume jenkins-docker-certs:/certs/client:ro --volume "$HOME":/home --publish 49001:8080 jenkinsci/blueocean
```

Open Jenkins at <http://localhost:49001/>.

Run the following to execute commands in a running Jenkins container

```bash
docker container exec -it jenkins bash
```

### Plug-ins

Optionally install the following plug-ins:

- [Azure Credentials](https://plugins.jenkins.io/azure-credentials/)
- [Role-based Authorization Strategy](https://plugins.jenkins.io/role-strategy/)
- [SonarQube Scanner](https://plugins.jenkins.io/sonar/)
