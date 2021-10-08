import * as APIUtil from '../util/session_api_util';


export const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS';

export const receiveRestaurants = restaurants => ({
    type: RECEIVE_RESTAURANTS,
    restaurants
})

export const restaurantsList = () => dispatch => (
    APIUtil.restaurants().then(restaurants=> (
        dispatch(receiveRestaurants(restaurants))
    ))
)