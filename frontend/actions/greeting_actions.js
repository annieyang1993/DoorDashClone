import * as APIUtil from '../util/session_api_util';

export const SEARCH_LOCATION = 'SEARCH_LOCATION';

export const searchLocation = (location) => ({
  type: SEARCH_LOCATION,
  location
});

export const receiveLocation = location => dispatch => (
  dispatch(searchLocation(location))
  )
;