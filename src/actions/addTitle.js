// import { showLoading, hideLoading } from "react-redux-loading-bar";
// import { saveTitle } from "../utils/api";

// export const ADD_TITLE = "ADD_TITLE";

// export const addTitle = (title) => ({
//   type: ADD_TITLE,
//   title,
// });

// export const handleAddTitle = (title) => {
//   return (dpatch) => {
//     dpatch(showLoading());
//     return saveTitle(title)
//       .then((formattedTitle) => {
//         dpatch(addTitle(formattedTitle));
//       })
//       .then(() => dpatch(hideLoading()))
//       .catch(() => {
//         alert("An error occured. Try again.");
//       });
//   };
// };