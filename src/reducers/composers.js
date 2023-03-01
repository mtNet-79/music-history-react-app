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

    case RECEIVE_DATA:
      console.log("ACTION COMPOSER: ", action.composers)
      return action.composers;
    default:
      return composers;
  }
}
