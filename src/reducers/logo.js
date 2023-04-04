import { RECEIVE_LOGO } from '../actions/fetchLogo';

// Your other imports and reducer functions

export default function logo(state = null, action) {
  switch (action.type) {
    case RECEIVE_LOGO:
      return action.logo;
    default:
      return state;
  }
}