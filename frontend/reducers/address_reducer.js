import { SEARCH_ADDRESS } from '../actions/session_actions';
import { CLEAR_STATE } from '../actions/cart_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case SEARCH_ADDRESS:
      return Object.assign({}, state, action.location);
    case CLEAR_STATE:
      return {};
    default:
      return state;
  }
};

export default usersReducer;
