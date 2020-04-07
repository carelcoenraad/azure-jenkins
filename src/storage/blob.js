// https://docs.microsoft.com/en-us/azure/storage/common/storage-samples-javascript
// https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/javascript/basic.js#L60
const {
  BlobServiceClient,
  StorageSharedKeyCredential
} = require('@azure/storage-blob');
require('dotenv').config();

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!accountName) {
  console.error('Account name is empty');
}

if (!accountKey) {
  console.error('Account key is empty');
}

if (!containerName) {
  console.error('Container name is empty');
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
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create a blob
  const content = `Hello from ${containerName}`;
  const blobName = `${containerName}${new Date().getTime()}`;
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
