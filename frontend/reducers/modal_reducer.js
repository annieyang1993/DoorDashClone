import { MODAL_STATUS} from '../actions/restaurant_actions';
import { CLEAR_STATE } from '../actions/cart_actions';

const itemReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case MODAL_STATUS:
      return Object.assign({}, {["modalStatus"]: action.modalStatus});
    case CLEAR_STATE:
      return {};
    default:
      return state;
  }
};

export default itemReducer;