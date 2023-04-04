
import AWS from 'aws-sdk';

// Update AWS config
AWS.config.update({
  accessKeyId: process.env.REACT_APP_WASABI_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_WASABI_SECRET_KEY,
  region: 'us-east-1',
});

// Set Wasabi's endpoint
const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
const s3 = new AWS.S3({ endpoint: wasabiEndpoint });

export default s3;
