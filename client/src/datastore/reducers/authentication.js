/* eslint-disable no-undefined */

import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
} from "../actions/authentication";

const initialState = {
  "isFetching": false,
  "isAuthenticated": false,
  "email": undefined,
  "password": undefined,
  "userId": undefined,
  "message": undefined,
  "error": undefined,

};

export default function authentication(state = initialState, action) {

  switch (action.type) {

  case LOGIN_REQUEST:
    return Object.assign({}, state, {
      "isFetching": true,
      "isAuthenticated": false,
      "email": action.email,
      "password": action.password,
    });
  case LOGIN_SUCCESS:
    return Object.assign({}, state, {
      "isFetching": false,
      "isAuthenticated": true,
      "password": undefined,
      "user": action.user,
      "userId": action.userId,
      "message": action.message,
      "error": undefined,
    });
  case LOGIN_FAILURE:
    return Object.assign({}, state, {
      "isFetching": false,
      "isAuthenticated": false,
      "password": undefined,
      "user": {},
      "userId": undefined,
      "message": undefined,
      "error": action.error,
    });
  case LOGOUT_SUCCESS:
    return Object.assign({}, state, {
      "isFetching": false,
      "isAuthenticated": false,
      "email": undefined,
      "password": undefined,
      "user": {},
      "userId": undefined,
      "message": undefined,
      "error": undefined,
    });
  default:
    return state;

  }

}
