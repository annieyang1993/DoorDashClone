import { SEARCH_LOCATION } from '../actions/greeting_actions';
import { CLEAR_STATE } from '../actions/cart_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case SEARCH_LOCATION:
      return Object.assign({}, state, action.location);
    case CLEAR_STATE:
      return {};
    default:
      return state;
  }
};

export default usersReducer;
