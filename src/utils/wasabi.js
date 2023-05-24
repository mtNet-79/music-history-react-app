
import AWS from 'aws-sdk';

// Update AWS config
AWS.config.update({
  accessKeyId: process.env.REACT_APP_WASABI_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_WASABI_SECRET_KEY,
  region: 'us-central-1',
});

// Set Wasabi's endpoint
// const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
const wasabiEndpoint = new AWS.Endpoint('https://s3.us-central-1.wasabisys.com'); // Change this to the correct endpoint
const s3 = new AWS.S3({ endpoint: wasabiEndpoint });


export default s3;
