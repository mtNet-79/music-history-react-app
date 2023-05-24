import s3 from '../utils/wasabi';

// Converts node js buffer class to one the browser can use
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}


export const RECEIVE_LOGO = 'RECEIVE_LOGO';

export function receiveLogo(logo) {
  return {
    type: RECEIVE_LOGO,
    logo,
  };
}



export function handleFetchLogo() {
  return async (dispatch) => {
    const params = {
      Bucket: 'music-history-images',
      Key: 'musichistorylogo.png',
    };

    try {
      const imageData = await s3.getObject(params).promise();
      console.log("imageData: ", imageData);  
      const imageBase64 = `data:image/png;base64,${arrayBufferToBase64(imageData.Body)}`; // Use the utility function
      dispatch(receiveLogo(imageBase64));
    } catch (error) {
      console.error('Error fetching image from Wasabi S3 bucket:', error);
    }
  };
}
