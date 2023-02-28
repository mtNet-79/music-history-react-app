import { RECEIVE_DATA } from "../actions/shared";
// import { ADD_STYLE } from "../actions/addStyles";

const initialState = {};

export default function styles(styles = initialState, action) {
  switch (action.type) {
    // case ADD_STYLE:
    //   const { style } = action;
    //   return {
    //     ...styles,
    //     [style.id]: style,
    //   };
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
      return action.styles;
    default:
      return styles;
  }
}
