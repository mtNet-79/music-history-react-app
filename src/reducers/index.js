import composers from "./composers";
import performers from "./performers";
import styles from "./styles";
import titles from "./titles";
import compositions from "./compositions";
import recordings from "./recordings";
import users from "./users";
import authedUser from "./authedUser";
import loading from "./loading";
import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  users,
  composers,
  performers,
  authedUser,
  styles,
  titles,
  compositions,
  recordings,
  loading,
  loadingBar: loadingBarReducer, 
});
