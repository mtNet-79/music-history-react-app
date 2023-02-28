import { RECEIVE_DATA } from "../actions/shared";
import { ADD_RECORDING } from "../actions/addRecording";

const initialState = {};

export default function recordings(recordings = initialState, action) {
  switch (action.type) {
    case ADD_RECORDING:
      const { recording } = action;
      return {
        ...recordings,
        [recording.id]: recording,
      };
    // case ANSWER_RECORDING:
    //   const { authedUser, pid, answer } = action;
    //   let votes = [];
    //   answer === "optionOne"
    //     ? (votes = [...recordingQuestions[pid].optionOne.votes, authedUser])
    //     : (votes = [...recordingQuestions[pid].optionTwo.votes, authedUser]);

    //   return {
    //     ...recordingQuestions,
    //     [pid]: {
    //       ...recordingQuestions[pid],
    //       optionOne:
    //         answer === "optionOne"
    //           ? {
    //               ...recordingQuestions[pid].optionOne,
    //               votes,
    //             }
    //           : { ...recordingQuestions[pid].optionOne },
    //       optionTwo:
    //         answer === "optionTwo"
    //           ? {
    //               ...recordingQuestions[pid].optionTwo,
    //               votes,
    //             }
    //           : { ...recordingQuestions[pid].optionTwo },
    //     },
    //   };

    case RECEIVE_DATA:
      return action.recordings;
    default:
      return recordings;
  }
}
