// useOAuth2.js
import { useCallback, useState, useRef } from "react";
import useLocalStorageState from "use-local-storage-state";

const OAUTH_STATE_KEY = "react-use-oauth2-state-key";
const POPUP_HEIGHT = 700;
const POPUP_WIDTH = 600;
const OAUTH_RESPONSE = "react-use-oauth2-response";
const DEFAULT_EXCHANGE_CODE_FOR_TOKEN_METHOD = "POST";


// https://medium.com/@dazcyril/generating-cryptographic-random-state-in-javascript-in-the-browser-c538b3daae50
const generateState = () => {
  const validChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let array = new Uint8Array(40);
  window.crypto.getRandomValues(array);
  array = array.map((x) => validChars.codePointAt(x % validChars.length));
  const randomState = String.fromCharCode.apply(null, array);
  return randomState;
};
const objectToQuery = (object) => {
  return new URLSearchParams(object).toString();
};

const queryToObject = (query) => {
  const parameters = new URLSearchParams(query);
  return Object.fromEntries(parameters.entries());
};

// const saveState = (state) => {
//   console.log("Stored state from view : ", state)
//   sessionStorage.setItem(OAUTH_STATE_KEY, state);
// };
const saveState = (state, redirectedFrom) => {  
  sessionStorage.setItem(OAUTH_STATE_KEY, state);
  // Save the pathname to sessionStorage if it exists
  console.log("redirectedFrom: ", redirectedFrom);
  if (redirectedFrom) {
    console.log("how did I GET IN HERE!?")
    sessionStorage.setItem('redirected-from', redirectedFrom);
  }
};

const removeState = () => {
  sessionStorage.removeItem(OAUTH_STATE_KEY);
};

const openPopup = (url) => {
  console.log("popup url : ", url);
  console.log("window :", window.location)
  // To fix issues with window.screen in multi-monitor setups, the easier option is to
  // center the pop-up over the parent window.
  const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
  const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
  const popup = window.open(
    url,
    "OAuth2 Popup",
    `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`
  );
  console.log("popup window:", popup);
  return popup;
};

const closePopup = (popupRef) => {
  console.log("Closing pop-up");
  popupRef.current?.close();
};

// const cleanup = (intervalRef, popupRef, handleMessageListener) => {
//   clearInterval(intervalRef.current);
//   closePopup(popupRef);
//   removeState();
//   window.removeEventListener("message", handleMessageListener);
// };

const enhanceAuthorizeUrl = (
  authorizeUrl,
  clientId,
  redirectUri,
  scope,
  state,
  responseType,
  extraQueryParametersRef
) => {
  const query = objectToQuery({
    response_type: responseType,
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    state,
    ...extraQueryParametersRef.current,
  });

  return `${authorizeUrl}?${query}`;
};



 
  
const use0Auth2 = (props) => {
  const {
    authorizeUrl,
    clientId,
    redirectUri,
    scope,
    responseType,
    extraQueryParameters = {},
    onSuccess,
    onError,
    redirectedFrom,
  } = props;

  const extraQueryParametersRef = useRef(extraQueryParameters);
  const popupRef = useRef();
  const intervalRef = useRef();
  // const [{ loading, error }, setUI] = useState({ loading: false, error: null });
  // const [data, setData] = useLocalStorageState(
  //   `${responseType}-${authorizeUrl}-${clientId}-${scope}`,
  //   {
  //     defaultValue: null,
  //   }
  // );


  const getAuth = useCallback(() => {
    
    // 1. Init
    // setUI({
    //   loading: true,
    //   error: null,
    // });

    // 2. Generate and save state
    const state = generateState();
    // redirectedFrom = redirectedFrom ? redirectedFrom : "/"
    saveState(state, redirectedFrom);
    console.log("get state: ", sessionStorage.getItem("redirected-from"))
      // 3. Open popup
    popupRef.current = openPopup(
        enhanceAuthorizeUrl(
          authorizeUrl,
          clientId,
          redirectUri,
          scope,
          state,
          responseType,
          extraQueryParametersRef
        )
      );
      
      console.log("windw now: ", window.location)
    // 4. Begin interval to check if popup was closed forcefully by the user
    intervalRef.current = setInterval(() => {
      const popupClosed =
        !popupRef.current ||
        !popupRef.current.window ||
        popupRef.current.window.closed;
      if (popupClosed) {
        // Popup was closed before completing auth...
        // setUI((ui) => ({
        //   ...ui,
        //   loading: false,
        // }));
        console.warn(
          "Warning: Popup was closed before completing authentication."
        );
        clearInterval(intervalRef.current);
        removeState();
      }
    }, 250);

    // Remove listener(s) on unmount
    return () => {
      // window.removeEventListener("message", handleMessageListener);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    authorizeUrl,
    clientId,
    redirectUri,
    scope,
    responseType,
    onSuccess,
    onError,
    // setUI,
    // setData,
  ]);
  return { getAuth };
};

export default use0Auth2;
