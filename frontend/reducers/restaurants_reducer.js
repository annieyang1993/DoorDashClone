
import { RECEIVE_RESTAURANTS} from '../actions/restaurants_actions';
import { CLEAR_STATE } from '../actions/cart_actions';

const restaurantsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RESTAURANTS:
      return Object.assign({}, state, action.restaurants);
    case CLEAR_STATE:
      return {};
    default:
      return state;
  }
};

export default restaurantsReducer;