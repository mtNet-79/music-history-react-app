require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/exchange_for_token', async (req, res) => {
  try {
    const clientId = req.query.client_id;
    const code = req.query.code;
    const redirectUri = req.query.redirect_uri;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    // console.log("clientId: ", clientId);
    // console.log("code: ", code);
    // console.log("redirectUri: ", redirectUri);
    // console.log("clientSecret: ", clientSecret);

    const googleResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        },
      }
    );
  //  console.log("googleResponse: ", googleResponse.data)
    const userInfoResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${googleResponse.data.access_token}`,
        },
      }
    );
     
    res.status(200).json(userInfoResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to exchange code for token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
