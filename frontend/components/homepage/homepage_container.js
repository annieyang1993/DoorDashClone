import { connect } from 'react-redux';
import * as APIUtil from '../../util/session_api_util';
import { logout } from '../../actions/session_actions';
import { restaurantsList } from '../../actions/restaurants_actions';
import {oneRestaurant } from '../../actions/restaurant_actions';
import {receiveLocation} from '../../actions/greeting_actions';
import {getLocation, searchAddress, updateUserLocation} from '../../actions/session_actions';
import Homepage from './homepage';
import { addItemToCart, clearCartItems, clearState } from '../../actions/cart_actions';

const mapStateToProps = ({ session, entities: { users, restaurants, currentRestaurant, cart, location, address} }) => {

  return {
    location: location,
    currentUser: users[session.id],
    restaurants: restaurants,
    currentRestaurant: currentRestaurant,
    cart: cart,
    address: address
  };
};

const mapDispatchToProps = dispatch => ({
  receiveLocation: (location) => dispatch(receiveLocation(location)),
  logout: () => dispatch(logout()),
  getAllRestaurants: () => dispatch(restaurantsList()),
  getCurrentRestaurant: (restaurantId) => dispatch(oneRestaurant(restaurantId)),
  getLocation: (user_id) => dispatch(getLocation(user_id)),
  searchAddress: (address) => dispatch(searchAddress(address)),
  updateUserLocation: (user_id, location) => dispatch(updateUserLocation(user_id, location)),
 clearCartItems: ()=>dispatch(clearCartItems()),
 clearState: ()=> dispatch(clearState())

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);