// https://docs.microsoft.com/en-us/azure/storage/common/storage-samples-javascript
// https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/javascript/basic.js#L60
const {
  BlobServiceClient,
  StorageSharedKeyCredential
} = require('@azure/storage-blob');
require('dotenv').config();

const accountName = process.env.ACCOUNT_NAME;
const accountKey = process.env.ACCOUNT_KEY;

if (!accountName) {
  console.error('Account is empty');
}

if (!accountKey) {
  console.error('Account key is empty');
}

async function main() {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );

  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  );

  // List containers
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`Container: ${container.name}`);
  }

  // Create a container
  const containerName = `container${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const createContainerResponse = await containerClient.create();
  console.log(
    `Created container ${containerName} successfully`,
    createContainerResponse.requestId
  );

  // Create a blob
  const content = 'hello';
  const blobName = `blob${new Date().getTime()}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(
    content,
    Buffer.byteLength(content)
  );
  console.log(
    `Uploaded block ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
}

main().catch((err) => {
  console.log('Error occurred: ', err);
  process.exit(1);
});
