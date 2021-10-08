import { RECEIVE_RESTAURANT } from '../actions/restaurant_actions';
import { CLEAR_STATE } from '../actions/cart_actions';

const restaurantReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RESTAURANT:
      return Object.assign({}, {["id"]: action.restaurantId}, Object.values(action.restaurant)[0]);
    default:
      return state;
  }
};

export default restaurantReducer;