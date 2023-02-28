import { RECEIVE_DATA } from "../actions/shared";
import { ADD_COMPOSER } from "../actions/addComposer";

const initialState = {};

export default function composers(composers = initialState, action) {
  switch (action.type) {
    case ADD_COMPOSER:
      const { composer } = action;
      return {
        ...composers,
        [composer.id]: composer,
      };
    // case ANSWER_COMPOSER:
    //   const { authedUser, pid, answer } = action;
    //   let votes = [];
    //   answer === "optionOne"
    //     ? (votes = [...composerQuestions[pid].optionOne.votes, authedUser])
    //     : (votes = [...composerQuestions[pid].optionTwo.votes, authedUser]);

    //   return {
    //     ...composerQuestions,
    //     [pid]: {
    //       ...composerQuestions[pid],
    //       optionOne:
    //         answer === "optionOne"
    //           ? {
    //               ...composerQuestions[pid].optionOne,
    //               votes,
    //             }
    //           : { ...composerQuestions[pid].optionOne },
    //       optionTwo:
    //         answer === "optionTwo"
    //           ? {
    //               ...composerQuestions[pid].optionTwo,
    //               votes,
    //             }
    //           : { ...composerQuestions[pid].optionTwo },
    //     },
    //   };

    case RECEIVE_DATA:
      console.log("ACTION COMPOSER: ", action.composers)
      return {
        ...composers,
        ...action.composers,
      };
    default:
      return composers;
  }
}
