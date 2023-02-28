
import logger  from "./logger";
import thunk from "redux-thunk";
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import { applyMiddleware } from "redux";

export default applyMiddleware(thunk, logger, loadingBarMiddleware());