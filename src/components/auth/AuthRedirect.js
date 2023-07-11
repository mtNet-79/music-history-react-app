// OAuth2Popup.jsx
import React, { useEffect, useState, useCallback} from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../../actions/authedUser";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const OAUTH_STATE_KEY = "react-use-oauth2-state-key";
const OAUTH_RESPONSE = "react-use-oauth2-response";
const exchangeCodeForTokenServerURL =
  process.env.REACT_APP_EXCHANGE_FOR_TOKEN_URL;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

// console.log("clientId: ", clientId);
const checkState = (receivedState) => {
  console.log("CHecked STATE: ", receivedState);
  const state = sessionStorage.getItem(OAUTH_STATE_KEY);
  console.log("CHecked stored STATE: ", state);
  return state === receivedState;
};

export const queryToObject = (query) => {
  const parameters = new URLSearchParams(query);
  return Object.fromEntries(parameters.entries());
};

// const onSuccess = (resData, dispatch, navigate, users) => {
//   const userId = resData?.id;
//   if (userId) {
//     dispatch(setAuthedUser(userId));
//     //TODO: check if the user exists, if not create it
//     //TODO: get jwt from the database?
//     const redirectedFrom = sessionStorage.getItem("redirected-from");
//     redirectedFrom ? navigate(redirectedFrom) : navigate("/");
//   }
// };

const AuthRedirect = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { users } = props;
  console.log("users :", users)
  const {
    Component = (
      <div style={{ margin: "12px" }} data-testid="popup-loading">
        Loading...
      </div>
    ),
  } = props;

  const onSuccess = useCallback((resData, users) => {
    console.log("resDAta in on Success: ", resData)
    console.log("users in on Success: ", users)
    const userId = resData?.id;
    if (userId) {
      dispatch(setAuthedUser(userId));
      const redirectedFrom = sessionStorage.getItem("redirected-from");
      redirectedFrom ? navigate(redirectedFrom) : navigate("/");
    }
  }, [dispatch, navigate]);
  // On mount
  useEffect(() => {
    const payload = {
      ...queryToObject(window.location.search.split("?")[1]),
      ...queryToObject(window.location.hash.split("#")[1]),
    };
    const state_from_payload = payload?.state;
    console.log("state_from_payload: ", state_from_payload);
    const payload_error = payload?.error;
    const code = new URLSearchParams(window.location.search).get("code");
    // console.log("code : ", code);
    // console.log(" sessionStorage", sessionStorage);
    const state = sessionStorage.getItem(OAUTH_STATE_KEY);
    // console.log("stateDataString: ", state);

    // console.log("IN EFFECT " + state + "checked state is " + checkState(state));
    // console.log("payload : ", payload);
    // console.log("window opener origin: ", window.opener.location.href);
    // Retrieve the code and state from the URL query parameters

    // const state = urlParams.get('state');

    if (!window.opener) {
		setError("An error occurred during authentication. Please try again.");
    }

    if (payload_error) {
      window.opener.postMessage({
        type: OAUTH_RESPONSE,
        error: decodeURI(error) || "OAuth payload error: An error has occured.",
      });
    } else if (state && checkState(state)) {
      console.log("payload passed");
      async function handleAuthCodeExchange() {
        try {
          // Make the API call to your backend
        //   console.log(
        //     "exchangeCodeForTokenServerURL: ",
        //     exchangeCodeForTokenServerURL
        //   );
        //   console.log("client ID: ", clientId);
        //   console.log("code: ", code);
        //   console.log("redirectUri: ", redirectUri);
          const response = await axios.post(
            exchangeCodeForTokenServerURL,
            null,
            {
              params: {
                client_id: clientId,
                code: code,
                redirect_uri: redirectUri,
              },
            }
          );
          // Process the response data
          const userData = response.data;
          console.log("userData: ", userData);

		  if (response.status === 200 && users !== null) {
			onSuccess(response.data);
		  } else {
			console.error("Failed to exchange code for token");
			setError("An error occurred during authentication. Please try again.");
		  }
        } catch (error) {
          console.error("Failed to exchange code for token", error);
        }
      }
      handleAuthCodeExchange();

      window.opener.postMessage(
        {
          type: OAUTH_RESPONSE,
          payload,
        },
        window.opener.location.origin
      );
    } else {
      window.opener.postMessage({
        type: OAUTH_RESPONSE,
        error: "OAuth error: State mismatch.",
      });
    }
  }, [dispatch, navigate, users, onSuccess, error]);
  if (error) {
    return <div>{error}</div>;
  } 
  return Component;
};
AuthRedirect.propTypes = {
	users: PropTypes.object.isRequired
}

const mapStateToProps = ({
	users
}) => ({
	users
})
export default connect(mapStateToProps)(AuthRedirect);
