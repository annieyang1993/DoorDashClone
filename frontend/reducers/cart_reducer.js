import {ADD_ITEM, CLEAR_CART } from '../actions/cart_actions';
import { CLEAR_STATE } from '../actions/cart_actions';

const cartReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case ADD_ITEM:
      return Object.assign({}, state, {[action.id]: action.item});
    case CLEAR_CART:
      return {};
    case CLEAR_STATE:
      return {};
    default:
      return state;
  }
};

export default cartReducer;

