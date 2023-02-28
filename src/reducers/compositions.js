import { RECEIVE_DATA } from "../actions/shared";
import { ADD_COMPOSITION } from "../actions/addComposition";

const initialState = {};

export default function compositions(compositions = initialState, action) {
  switch (action.type) {
    case ADD_COMPOSITION:
      const { composition } = action;
      return {
        ...compositions,
        [composition.id]: composition,
      };
    // case ANSWER_COMPOSITION:
    //   const { authedUser, pid, answer } = action;
    //   let votes = [];
    //   answer === "optionOne"
    //     ? (votes = [...compositionQuestions[pid].optionOne.votes, authedUser])
    //     : (votes = [...compositionQuestions[pid].optionTwo.votes, authedUser]);

    //   return {
    //     ...compositionQuestions,
    //     [pid]: {
    //       ...compositionQuestions[pid],
    //       optionOne:
    //         answer === "optionOne"
    //           ? {
    //               ...compositionQuestions[pid].optionOne,
    //               votes,
    //             }
    //           : { ...compositionQuestions[pid].optionOne },
    //       optionTwo:
    //         answer === "optionTwo"
    //           ? {
    //               ...compositionQuestions[pid].optionTwo,
    //               votes,
    //             }
    //           : { ...compositionQuestions[pid].optionTwo },
    //     },
    //   };

    case RECEIVE_DATA:
      return action.compositions;
    default:
      return compositions;
  }
}
