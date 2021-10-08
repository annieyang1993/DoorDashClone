import { RECEIVE_ITEM} from '../actions/restaurant_actions';
import { CLEAR_STATE } from '../actions/cart_actions';

const itemReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ITEM:
      return Object.assign({}, action.currentItem);
    case CLEAR_STATE:
      return {};
    default:
      return state;
  }
};

export default itemReducer;