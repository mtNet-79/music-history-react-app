// import { showLoading, hideLoading } from "react-redux-loading-bar";
// import { saveRecording } from "../utils/api";

// export const ADD_RECORDING = "ADD_RECORDING";

// export const addRecording = (recording) => ({
//   type: ADD_RECORDING,
//   recording,
// });

// export const handleAddRecording = (recording) => {
//   return (dpatch) => {
//     dpatch(showLoading());
//     return saveRecording(recording)
//       .then((formattedRecording) => {
//         dpatch(addRecording(formattedRecording));
//       })
//       .then(() => dpatch(hideLoading()))
//       .catch(() => {
//         alert("An error occured. Try again.");
//       });
//   };
// };