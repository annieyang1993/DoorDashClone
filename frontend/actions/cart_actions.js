
export const ADD_ITEM = 'ADD_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const CLEAR_STATE = 'CLEAR_STATE';

export const addItemToCart = item => ({
  type: ADD_ITEM,
  item: item,
  id: item["item"]["id"]
});

export const clearCartItems = () =>({
  type: CLEAR_CART
})

export const clearState = () => ({
  type: CLEAR_STATE
})