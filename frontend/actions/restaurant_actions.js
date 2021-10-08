import * as APIUtil from '../util/session_api_util';


export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT';
export const RECEIVE_MENU = 'RECEIVE_MENU';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const MODAL_STATUS = 'MODAL_STATUS';

export const receiveRestaurant = restaurant => ({
    type: RECEIVE_RESTAURANT,
    restaurant: restaurant,
    restaurantId: parseInt(Object.keys(restaurant)[0])
})

export const receiveMenu = items => ({
    type: RECEIVE_MENU,
    menu: items
})

export const receiveItem = item => ({
    type: RECEIVE_ITEM,
    currentItem: item
})

export const modalStatus = bool => ({
    type: MODAL_STATUS,
    modalStatus: bool
})

export const oneRestaurant = (restaurantId) => dispatch => (
    APIUtil.fetchRestaurant(restaurantId).then(restaurant=> (
        dispatch(receiveRestaurant(restaurant))
    
    ))
)

export const menu = (restaurantId) => dispatch => (
    APIUtil.fetchItems(restaurantId).then(items=>
        dispatch(receiveMenu(items))
    )
)

export const getItem = (restaurantId, itemId) => dispatch => (
    APIUtil.fetchItem(restaurantId, itemId).then(item=>
        dispatch(receiveItem(item)))
)


