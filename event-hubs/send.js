// https://docs.microsoft.com/en-us/azure/event-hubs/get-started-node-send-v2
const { EventHubProducerClient } = require('@azure/event-hubs');

const connectionString = process.env.AZURE_EVENT_HUBS_CONNECTION_STRING;
const eventHubName = process.env.AZURE_EVENT_HUBS_EVENT_HUB_NAME;

if (!connectionString) {
  console.error('Connection string is empty');
}

if (!eventHubName) {
  console.error('Event hub name is empty');
}

async function main() {
  // Create a producer client to send messages to the event hub.
  const producer = new EventHubProducerClient(connectionString, eventHubName);

  // Prepare a batch of three events.
  const batch = await producer.createBatch();
  batch.tryAdd({ body: 'First event' });
  batch.tryAdd({ body: 'Second event' });
  batch.tryAdd({ body: 'Third event' });

  // Send the batch to the event hub.
  await producer.sendBatch(batch);

  // Close the producer client.
  await producer.close();

  console.log('A batch of three events have been sent to the event hub');
}

main().catch((err) => {
  console.log('Error occurred: ', err);
  process.exit(1);
});
