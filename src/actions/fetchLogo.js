import s3 from '../utils/wasabi';

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

    console.log("HERE");

    try {
      const imageData = await s3.getObject(params).promise();
      console.log("imageData: ", imageData);
      const imageBase64 = `data:image/png;base64,${Buffer.from(imageData.Body).toString('base64')}`;
      dispatch(receiveLogo(imageBase64));
    } catch (error) {
      console.error('Error fetching image from Wasabi S3 bucket:', error);
    }
  };
}
