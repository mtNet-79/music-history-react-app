// OAuth2Popup.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../../actions/authedUser";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showLoading } from "react-redux-loading-bar";

const OAUTH_STATE_KEY = "react-use-oauth2-state-key";
const OAUTH_RESPONSE = "react-use-oauth2-response";
const exchangeCodeForTokenServerURL =
  process.env.REACT_APP_AUTH_GOOGLE_TOKEN_URL;

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

// console.log("clientId: ", clientId);
const checkState = (receivedState) => {
  const state = sessionStorage.getItem(OAUTH_STATE_KEY);
  return state === receivedState;
};

export const queryToObject = (query) => {
  const parameters = new URLSearchParams(query);
  return Object.fromEntries(parameters.entries());
};

const AuthRedirect = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { users } = props;
  console.log("users at AuthRedirect line 45 pre function:", users);
  const {
    Component = (
      <div style={{ margin: "12px" }} data-testid="popup-loading">
        Processing...
      </div>
    ),
  } = props;

  const onSuccess = useCallback(
    (resData, users) => {
      console.log("resDAta in on Success: ", resData);
      console.log("users in on Success: ", users);
      const userData = resData?.user;
      if (userData) {
        console.log("at uid: ", userData);
        dispatch(setAuthedUser(userData.last_name));
        const redirectedFrom = sessionStorage.getItem("redirected-from");
        console.log("authRedirect line 63", redirectedFrom);
        redirectedFrom ? navigate(redirectedFrom) : navigate("/");
      }
    },
    [dispatch, navigate]
  );
  // On mount
  useEffect(() => {
    const payload = {
      ...queryToObject(window.location.search.split("?")[1]),
      ...queryToObject(window.location.hash.split("#")[1]),
    };
    const state_from_payload = payload?.state;
    const payload_error = payload?.error;
    const code = new URLSearchParams(window.location.search).get("code");
    console.log("code : ", code);
    console.log(" sessionStorage", sessionStorage);
    const state = sessionStorage.getItem(OAUTH_STATE_KEY);

    if (!window.opener) {
      setError("An error occurred during authentication. Please try again.");
    }

    if (payload_error) {
      window.opener.postMessage({
        type: OAUTH_RESPONSE,
        error: decodeURI(error) || "OAuth payload error: An error has occured.",
      });
    } else if (state && checkState(state)) {
      async function handleAuthCodeExchange() {
        try {
          // Make the API call to your backend
          //   console.log(
          //     "exchangeCodeForTokenServerURL: ",
          //     exchangeCodeForTokenServerURL
          //   );
          // console.log("client ID: ", clientId);
          // console.log("code: ", code);
          // console.log("redirectUri: ", redirectUri);
          // console.log("exchangeCodeForTokenServerURL: ", exchangeCodeForTokenServerURL);
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
            onSuccess(response.data, users);
          } else {
            console.error("Failed to exchange code for token");
            setError(
              "An error occurred during authentication. Please try again."
            );
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
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ users }) => ({
  users,
});
export default connect(mapStateToProps)(AuthRedirect);
