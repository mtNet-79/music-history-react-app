import { RECEIVE_DATA } from "../actions/shared";
// import { ADD_TITLE} from "../actions/addTitles";

const initialState = {};

export default function titles(titles = initialState, action) {
  switch (action.type) {
    // case ADD_TITLE:
    //   const { title } = action;
    //   return {
    //     ...titles,
    //     [title.id]: title,
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
      return action.titles;
    default:
      return titles;
  }
}
