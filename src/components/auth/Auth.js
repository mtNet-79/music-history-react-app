// useOAuth2.js
import { useCallback, useState, useRef } from "react";
import useLocalStorageState from "use-local-storage-state";

const OAUTH_STATE_KEY = "react-use-oauth2-state-key";
const POPUP_HEIGHT = 700;
const POPUP_WIDTH = 600;
const OAUTH_RESPONSE = "react-use-oauth2-response";
const DEFAULT_EXCHANGE_CODE_FOR_TOKEN_METHOD = "POST";
const responseType = "code";

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

const saveState = (state) => {
  sessionStorage.setItem(OAUTH_STATE_KEY, state);
};

const removeState = () => {
  sessionStorage.removeItem(OAUTH_STATE_KEY);
};

const openPopup = (url) => {
  console.log("popup url : ", url);
  // To fix issues with window.screen in multi-monitor setups, the easier option is to
  // center the pop-up over the parent window.
  const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
  const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
  return window.open(
    url,
    "OAuth2 Popup",
    `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`
  );
};

const closePopup = (popupRef) => {
  console.log("Closing pop-up");
  popupRef.current?.close();
};

const cleanup = (intervalRef, popupRef, handleMessageListener) => {
  clearInterval(intervalRef.current);
  closePopup(popupRef);
  removeState();
  window.removeEventListener("message", handleMessageListener);
};

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

const formatExchangeCodeForTokenServerURL = (
  exchangeCodeForTokenServerURL,
  clientId,
  code,
  redirectUri,
  state
) => {
  const url = exchangeCodeForTokenServerURL.split("?")[0];
  console.log("url from split : ", url);
  const anySearchParameters = queryToObject(
    exchangeCodeForTokenServerURL.split("?")[1]
  );
  return `${url}?${objectToQuery({
    ...anySearchParameters,
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    state,
  })}`;
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
  } = props;

  const extraQueryParametersRef = useRef(extraQueryParameters);
  const popupRef = useRef();
  const intervalRef = useRef();
  const [{ loading, error }, setUI] = useState({ loading: false, error: null });
  const [data, setData] = useLocalStorageState(
    `${responseType}-${authorizeUrl}-${clientId}-${scope}`,
    {
      defaultValue: null,
    }
  );

  const exchangeCodeForTokenServerURL =
    responseType === "code" && props.exchangeCodeForTokenServerURL;
  const exchangeCodeForTokenMethod =
    responseType === "code" && props.exchangeCodeForTokenMethod;
  console.log("exchangeCodeForTokenServerURL: ", exchangeCodeForTokenServerURL);

  const getAuth = useCallback(() => {
    // 1. Init
    setUI({
      loading: true,
      error: null,
    });

    // 2. Generate and save state
    const state = generateState();
    saveState(state);

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

    // 4. Register message listener
    async function handleMessageListener(message) {
      try {
        // if (message.origin !== expectedOAuthServerDomain) {
        //   // Ignore messages from unexpected origins
        //   return;
        // }
        const type = message && message.data && message.data.type;
        console.log("IN TRY type: ", message);
        if (type === OAUTH_RESPONSE) {
          const errorMaybe = message && message.data && message.data.error;
          console.log("errorMaybe: ", errorMaybe)
          if (errorMaybe) {
            setUI({
              loading: false,
              error: errorMaybe || "Unknown Error",
            });
          } else {
            let payload = message?.data?.payload;
            const response = await fetch(
              formatExchangeCodeForTokenServerURL(
                exchangeCodeForTokenServerURL,
                clientId,
                payload?.code,
                redirectUri,
                state
              ),
              {
                method:
                  exchangeCodeForTokenMethod ||
                  DEFAULT_EXCHANGE_CODE_FOR_TOKEN_METHOD,
              }
            );
            console.log("response: ", response)
            if (!response.ok) {
              setUI({
                loading: false,
                error: "Failed to exchange code for token",
              });
            } else {
              payload = await response.json();
              setUI({
                loading: false,
                error: null,
              });
              setData(payload);
              if (onSuccess) {
                await onSuccess(payload);
              }
            }
          }
        } else return;
      } catch (genericError) {
        console.error(genericError);
        setUI({
          loading: false,
          error: genericError.toString(),
        });
      } finally {
        // Clear stuff ...
        // cleanup(intervalRef, popupRef, handleMessageListener);
      }
    }
    window.addEventListener("message", handleMessageListener);

    // 4. Begin interval to check if popup was closed forcefully by the user
    intervalRef.current = setInterval(() => {
      const popupClosed =
        !popupRef.current ||
        !popupRef.current.window ||
        popupRef.current.window.closed;
      if (popupClosed) {
        // Popup was closed before completing auth...
        setUI((ui) => ({
          ...ui,
          loading: false,
        }));
        console.warn(
          "Warning: Popup was closed before completing authentication."
        );
        clearInterval(intervalRef.current);
        removeState();
        window.removeEventListener("message", handleMessageListener);
      }
    }, 250);

    // Remove listener(s) on unmount
    return () => {
      window.removeEventListener("message", handleMessageListener);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    authorizeUrl,
    clientId,
    redirectUri,
    scope,
    responseType,
    exchangeCodeForTokenServerURL,
    exchangeCodeForTokenMethod,
    onSuccess,
    onError,
    setUI,
    setData,
  ]);
  return { data, loading, error, getAuth };
};

export default use0Auth2;
