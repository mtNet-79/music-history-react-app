import { showLoading, hideLoading } from "react-redux-loading-bar";
import { savePerformer } from "../utils/api";

export const ADD_PERFORMER = "ADD_PERFORMER";

export const addPerformer = (performer) => ({
  type: ADD_PERFORMER,
  performer,
});

export const handleAddPerformer = (performer) => {
  return (dpatch) => {
    dpatch(showLoading());
    return savePerformer(performer)
      .then((formattedPerformer) => {
        dpatch(addPerformer(formattedPerformer));
      })
      .then(() => dpatch(hideLoading()))
      .catch(() => {
        alert("An error occured. Try again.");
      });
  };
};
