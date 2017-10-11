/* eslint-disable no-underscore-dangle */

import Axios from "axios";

// Register Section
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

let requestRegister = (email, password) => {

  return {
    "type": REGISTER_REQUEST,
    "isFetching": true,
    "isAuthenticated": false,
    email,
    password,
  };

};

let receiveRegister = (user, userId, message) => {

  return {
    "type": REGISTER_SUCCESS,
    "isFetching": false,
    "isAuthenticated": true,
    user,
    userId,
    message,
  };

};

let registerError = (error) => {

  return {
    "type": REGISTER_FAILURE,
    "isFetching": false,
    "isAuthenticated": false,
    error,
  };

};

// Calls the API to get a userId and
// dispatches actions along the way
export let registerUser = (email, password, firstName, lastName) => {

  let data = {
    email,
    password,
    firstName,
    lastName,
  };

  return (dispatch) => {

    return new Promise((resolve, reject) => {

      dispatch(requestRegister(email, password));

      Axios("/api/register", {
        "method": "post",
        data,
      }).then((response) => {

        const user = response.data;

        Axios.defaults.headers.common.userId = user._id;

        return resolve(dispatch(receiveRegister(user, user._id, "Registration Successful!")));

      }).catch((err) => {

        let error = new Error(err.response.data.message);
        error.name = err.response.data.code;

        return reject(dispatch(registerError(error)));

      });

    });

  };

};

// Login Section
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

let requestLogin = (email, password) => {

  return {
    "type": LOGIN_REQUEST,
    "isFetching": true,
    "isAuthenticated": false,
    email,
    password,
  };

};

let receiveLogin = (user, userId, message) => {

  return {
    "type": LOGIN_SUCCESS,
    "isFetching": false,
    "isAuthenticated": true,
    user,
    userId,
    message,
  };

};

let loginError = (error) => {

  return {
    "type": LOGIN_FAILURE,
    "isFetching": false,
    "isAuthenticated": false,
    error,
  };

};

// Calls the API to get a userId and
// dispatches actions along the way
export let loginUser = (email, password) => {

  let data = {
    email,
    password,
  };

  return (dispatch) => {

    return new Promise((resolve, reject) => {

      dispatch(requestLogin(email, password));

      Axios("/api/login", {
        "method": "post",
        data,
      }).then((response) => {

        const user = response.data;

        Axios.defaults.headers.common.userId = user._id;

        return resolve(dispatch(receiveLogin(user, user._id, "Registration Successful!")));

      }).catch((err) => {

        let error = new Error(err.response.data.message);
        error.name = err.response.data.code;

        return reject(dispatch(loginError(error)));

      });

    });

  };

};

// Logout Section
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

const requestLogout = () => {

  return {
    "type": LOGOUT_REQUEST,
    "isFetching": true,
    "isAuthenticated": true,
  }

};

const receiveLogout = () => {

  return {
    "type": LOGOUT_SUCCESS,
    "isFetching": false,
    "isAuthenticated": false,
  }

};

// Logs the user out
export const logoutUser = () => {

  return (dispatch) => {

    delete Axios.defaults.headers.common.userId;

    dispatch(requestLogout());
    dispatch(receiveLogout());

  };

};


