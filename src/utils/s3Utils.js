// src/utils/s3Utils.js
//CODE NOT USED CURRENTOY IN THE APPLICATION
//will create a presigned url that does not require aws creds to use
import AWS from 'aws-sdk';

export const generatePresignedUrl = async (bucket, key) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_WASABI_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_WASABI_SECRET_KEY,
    region: 'us-central-1',
    endpoint: 'https://s3.us-central-1.wasabisys.com',
  });

  const params = {
    Bucket: bucket,
    Key: key,
    Expires: 3600, // URL valid for 1 hour
  };

  try {
    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    return null;
  }
};
