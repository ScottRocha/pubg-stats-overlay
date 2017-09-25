/* eslint-disable no-undefined */

import { KEY_TEST_REQUEST, KEY_TEST_SUCCESS, KEY_TEST_FAILURE } from "../actions/authentication";

const initialState = {
  "isFetching": false,
  "isAuthenticated": false,
  "apiKey": undefined,
  "error": undefined,
};

export default function authentication(state = initialState, action) {

  switch (action.type) {

  case KEY_TEST_REQUEST:
    return Object.assign({}, state, {
      "isFetching": true,
      "isAuthenticated": false,
      "apiKey": action.apiKey,
    });
  case KEY_TEST_SUCCESS:
    return Object.assign({}, state, {
      "isFetching": false,
      "isAuthenticated": true,
      "apiKey": action.apiKey,
    });
  case KEY_TEST_FAILURE:
    return Object.assign({}, state, {
      "isFetching": false,
      "isAuthenticated": false,
      "apiKey": undefined,
      "error": action.error,
    });
  default:
    return state;

  }

}
