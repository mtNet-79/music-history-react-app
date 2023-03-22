import React, { useEffect } from 'react';
import axios from 'axios';
// const OAUTH_STATE_KEY = "react-use-oauth2-state-key";
const OAUTH_RESPONSE = "react-use-oauth2-response";
const CallbackComponent = () => {
  useEffect(() => {
    const exchangeCodeForToken = async () => {
        const code = new URLSearchParams(window.location.search).get('code');
        const stateString = new URLSearchParams(window.location.search).get('state');
        const state = stateString ? JSON.parse(stateString) : null;

      if (code && state) {
        try {
          const response = await axios.post(
            'http://localhost:5001/exchange_for_token',
            null,
            { 
                params: { 
                    client_id: "220254089568-e4d4f55nup3ulpqu8netkk6dhpghmd3l.apps.googleusercontent.com", 
                    code, 
                    redirect_uri: "https://localhost:3000/callback", 
                    state 
                } 
            }
          );

          window.opener.postMessage({
            type: OAUTH_RESPONSE,
            payload: response.data,
          });
        } catch (error) {
          window.opener.postMessage({
            type: OAUTH_RESPONSE,
            error: 'Failed to exchange code for token',
          });
        }
      } else {
        window.opener.postMessage({
          type: OAUTH_RESPONSE,
          error: 'OAuth error: Invalid response',
        });
      }
    };

    exchangeCodeForToken();
  }, []);

  return <div>Processing...</div>;
};

export default CallbackComponent;
