// index.js

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import './styles/index.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./components/App";
import { store } from "./app/store";
import { Auth0Provider } from "@auth0/auth0-react";

//react root html container set up ??
const container = document.getElementById("root");
const root = createRoot(container);
//wrap app in router to hanlde routes ?? why do we need it?
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Auth0Provider
          domain="mtdev108.us.auth0.com"
          clientId="qCjl7oYwWHyy5TWTvCx0IRZWvq5ibDZl"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <App />
        </Auth0Provider>
      </Router>
    </Provider>
  </React.StrictMode>
);
