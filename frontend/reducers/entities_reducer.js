import { combineReducers } from 'redux';


import usersReducer from './users_reducer';
import locationReducer from './location_reducer'
import restaurantsReducer from './restaurants_reducer'
import restaurantReducer from './restaurant_reducer'
import menuReducer from './menu_reducer'
import itemReducer from './item_reducer'
import modalReducer from './modal_reducer'
import cartReducer from './cart_reducer'
import addressReducer from './address_reducer'

export default combineReducers({

  users: usersReducer,
  location: locationReducer,
  restaurants: restaurantsReducer,
  currentRestaurant: restaurantReducer,
  menu: menuReducer,
  currentItem: itemReducer,
  modalStatus: modalReducer,
  cart: cartReducer,
  address: addressReducer


});
