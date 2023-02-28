import { RECEIVE_DATA } from "../actions/shared";
import { ADD_PERFORMER } from "../actions/addPerformer";

const initialState = {};

export default function performers(performers = initialState, action) {
  switch (action.type) {
    case ADD_PERFORMER:
      const { performer } = action;
      return {
        ...performers,
        [performer.id]: performer,
      };
    // case ANSWER_PERFORMER:
    //   const { authedUser, pid, answer } = action;
    //   let votes = [];
    //   answer === "optionOne"
    //     ? (votes = [...performerQuestions[pid].optionOne.votes, authedUser])
    //     : (votes = [...performerQuestions[pid].optionTwo.votes, authedUser]);

    //   return {
    //     ...performerQuestions,
    //     [pid]: {
    //       ...performerQuestions[pid],
    //       optionOne:
    //         answer === "optionOne"
    //           ? {
    //               ...performerQuestions[pid].optionOne,
    //               votes,
    //             }
    //           : { ...performerQuestions[pid].optionOne },
    //       optionTwo:
    //         answer === "optionTwo"
    //           ? {
    //               ...performerQuestions[pid].optionTwo,
    //               votes,
    //             }
    //           : { ...performerQuestions[pid].optionTwo },
    //     },
    //   };

    case RECEIVE_DATA:
      return action.performers;
    default:
      return performers;
  }
}
