import { SET_AUTHED_USER } from "../actions/authedUser";

const authedUser = (state = null, action) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      if(action.id) return action.id;
      else return null;
    default:
      return state;
  }
};

export default authedUser;
