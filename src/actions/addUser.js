import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveUser } from "../utils/api";
import { setAuthedUser } from "./authedUser";

export const ADD_USER = "ADD_USER";

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const handleAddUser = ({fullName, image, password, userName, users}) => {
   
  return (dispatch) => {
    dispatch(showLoading());
    return saveUser({ fullName, image, password, userName, users })
      .then((user) => {
        dispatch(addUser(user));
        dispatch(setAuthedUser(user.id));
      })
      .then(() => dispatch(hideLoading()))
      .catch((err) => {
        alert(err);
        dispatch(hideLoading())
      });
  };
};