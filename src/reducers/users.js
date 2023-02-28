import { RECEIVE_DATA } from "../actions/shared";
import { ADD_USER } from "../actions/addUser";
import { ADD_COMPOSER } from "../actions/addComposer";

export default function users(state = {}, action) {
  switch (action.type) {
    case ADD_USER:
      const { user } = action;
      return {
        ...state,
        [user.id]: user,
      };
    case ADD_COMPOSER:
      const { composer } = action;
      return {
        ...state,
        [composer.author]: {
          ...state[composer.author],
          composers: [...state[composer.author].composers, composer.id],
        },
      };
    case RECEIVE_DATA:
      return action.users;
    default:
      return state;
  }
}
