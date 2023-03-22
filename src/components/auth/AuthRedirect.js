// OAuth2Popup.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAuthedUser } from '../../actions/authedUser';

const OAUTH_STATE_KEY = "react-use-oauth2-state-key";
const OAUTH_RESPONSE = "react-use-oauth2-response";
const exchangeCodeForTokenServerURL = process.env.REACT_APP_EXCHANGE_FOR_TOKEN_URL;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
console.log("clientId: ", clientId);
const checkState = (receivedState) => {
	console.log("CHecked STATE: ", receivedState)
	const state = sessionStorage.getItem(OAUTH_STATE_KEY);
	console.log("CHecked stored STATE: ", state)
	return state === receivedState;
};

export const queryToObject = (query) => {
	const parameters = new URLSearchParams(query);
	return Object.fromEntries(parameters.entries());
};


const onSuccess = (payload) => {
		console.log('Success', payload);
		// Assuming the user's ID is available in the payload.
		// Modify this line if the user ID is stored differently in the payload.
		const userId = payload.user_id;
		// dispatch(setAuthedUser(userId));
		// redirectedFrom ? navigate(redirectedFrom) : navigate('/');
	  };

const AuthRedirect = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		Component = (
			<div style={{ margin: '12px' }} data-testid="popup-loading">
				Loading...
			</div>
		),
	} = props;

	// On mount
	useEffect(() => {
		
		const payload = {
			...queryToObject(window.location.search.split('?')[1]),
			...queryToObject(window.location.hash.split('#')[1]),
		};
		const state_from_payload = payload?.state;
		console.log("state_from_payload: ", state_from_payload);
		const error = payload?.error;
		const code = new URLSearchParams(window.location.search).get('code');
		console.log("code : ", code);
		console.log(" sessionStorage", sessionStorage);
		const state = sessionStorage.getItem(OAUTH_STATE_KEY);
		console.log("stateDataString: ", state)

		console.log("IN EFFECT " + state + "checked state is " + checkState(state))
		console.log('payload : ', payload)
		console.log('window opener origin: ', window.opener.location.href)
		// Retrieve the code and state from the URL query parameters
		
		// const state = urlParams.get('state');

		if (!window.opener) {
			throw new Error('No window opener');
		}

		if (error) {
			window.opener.postMessage({
				type: OAUTH_RESPONSE,
				error: decodeURI(error) || 'OAuth error: An error has occured.',
			});
		} else if (state && checkState(state)) {
			console.log("THIS WORKED");
			async function handleAuthCodeExchange() {
				try {
					// Make the API call to your backend
					console.log(" exchangeCodeForTokenServerURL:", exchangeCodeForTokenServerURL)
					const response = await axios.post(exchangeCodeForTokenServerURL, null, {
					  params: {
						client_id: clientId,
						code: code,
						redirect_uri: redirectUri,
					  },
					});
					console.log("THE response: ", response);
					// Process the response data
					const userData = response.data;
					console.log(userData);

					if (response.status !== 200) {
						// setUI({
						//   loading: false,
						//   error: "Failed to exchange code for token",
						// });
						
				} else {
						
						// setUI({
						//   loading: false,
						//   error: null,
						// });
						const userId = response.data?.id;
						if (userId) {
							dispatch(setAuthedUser(userId));
							const redirectedFrom = sessionStorage.getItem("redirected-from")
      						redirectedFrom ? navigate(redirectedFrom) : navigate('/');;
						  }
						// if (onSuccess) {
						//   await onSuccess(payload);
						// }
					  }
   
				} catch (error) {
					console.error('Failed to exchange code for token', error);
				}

					
			}
			handleAuthCodeExchange();
			 
			window.opener.postMessage({
				type: OAUTH_RESPONSE,
				payload,
			}, window.opener.location.origin);
		} else {
			window.opener.postMessage({
				type: OAUTH_RESPONSE,
				error: 'OAuth error: State mismatch.',
			});
		}
	}, []);

	return Component;
};

export default AuthRedirect;
