// import { showLoading, hideLoading } from "react-redux-loading-bar";
// import { saveComposition } from "../utils/api";

// export const ADD_COMPOSITION = "ADD_COMPOSITION";

// export const addComposition = (composition) => ({
//   type: ADD_COMPOSITION,
//   composition,
// });

// export const handleAddComposition = (composition) => {
//   return (dpatch) => {
//     dpatch(showLoading());
//     return saveComposition(composition)
//       .then((formattedComposition) => {
//         dpatch(addComposition(formattedComposition));
//       })
//       .then(() => dpatch(hideLoading()))
//       .catch(() => {
//         alert("An error occured. Try again.");
//       });
//   };
// };
