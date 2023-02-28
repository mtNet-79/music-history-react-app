import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveComposer } from "../utils/api";

export const ADD_COMPOSER = "ADD_COMPOSER";

export const addComposer = (composer) => ({
  type: ADD_COMPOSER,
  composer,
});

export const handleAddComposer = (composer) => {
  return (dpatch) => {
    dpatch(showLoading());
    return saveComposer(composer)
      .then((formattedComposer) => {
        dpatch(addComposer(formattedComposer));
      })
      .then(() => dpatch(hideLoading()))
      .catch(() => {
        alert("An error occured. Try again.");
      });
  };
};
