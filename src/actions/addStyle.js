// import { showLoading, hideLoading } from "react-redux-loading-bar";
// import { saveStyle } from "../utils/api";

// export const ADD_STYLE = "ADD_STYLE";

// export const addStyle = (style) => ({
//   type: ADD_STYLE,
//   style,
// });

// export const handleAddStyle = (style) => {
//   return (dpatch) => {
//     dpatch(showLoading());
//     return saveStyle(style)
//       .then((formattedStyle) => {
//         dpatch(addStyle(formattedStyle));
//       })
//       .then(() => dpatch(hideLoading()))
//       .catch(() => {
//         alert("An error occured. Try again.");
//       });
//   };
// };