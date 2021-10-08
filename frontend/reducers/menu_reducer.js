import { RECEIVE_MENU } from '../actions/restaurant_actions';
import { CLEAR_STATE } from '../actions/cart_actions';

const menuReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MENU:
      return Object.assign({}, action.menu);
    case CLEAR_STATE:
      return {};
    default:
      return state;
  }
};

export default menuReducer;