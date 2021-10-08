import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const SEARCH_ADDRESS = 'SEARCH_ADDRESS';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const deleteErrors = errors => ({
  type: CLEAR_ERRORS,
  errors
})

export const searchAddress = (location) => ({
  type: SEARCH_ADDRESS,
  location
});

export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(user => {
    
    dispatch(receiveCurrentUser(user))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))//dispatch(receiveErrors(err.responseJSON))
  ))
);

export const getLocation = user_id => dispatch => (
  APIUtil.getLocation(user_id).then(location => {
    dispatch(searchAddress({category: location.category, latitude: location.latitude, longitude: location.longitude}))
  }, err => (
    alert(err.responseJSON)//dispatch(receiveErrors(err.responseJSON))
  ))
);

export const updateUserLocation = (user_id, location) => dispatch => (
  APIUtil.updateUserLocation(user_id, location)
)

export const logout = () => dispatch => (
  APIUtil.logout().then(user => (
    dispatch(logoutCurrentUser())
  ))
);

export const clearErrors = () => dispatch => (
    dispatch(deleteErrors([]))
);
