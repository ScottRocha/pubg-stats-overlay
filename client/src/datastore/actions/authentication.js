import Axios from "axios";

export const KEY_TEST_REQUEST = "KEY_TEST_REQUEST";
export const KEY_TEST_SUCCESS = "KEY_TEST_SUCCESS";
export const KEY_TEST_FAILURE = "KEY_TEST_FAILURE";

const requestKeyTest = (apiKey) => {

  return {
    "type": KEY_TEST_REQUEST,
    apiKey,
  };

};

const receiveKeyTestSuccess = (apiKey) => {

  return {
    "type": KEY_TEST_SUCCESS,
    apiKey,
  };

};

const keyTestError = (apiKey, error) => {

  return {
    "type": KEY_TEST_FAILURE,
    apiKey,
    error,
  };

};

export const checkKey = (apiKey) => {

  return (dispatch) => {

    const getKeyTest = () => {

      return new Promise((resolve, reject) => {

        Axios("/api/test", {
          "method": "get",
          "params": { apiKey },
        }).then(() => {

          Axios.defaults.headers.common.apiKey = apiKey;

          return resolve();

        }).catch((err) => {

          return reject(err);

        });

      });

    };

    return new Promise((resolve, reject) => {

      dispatch(requestKeyTest(apiKey));

      getKeyTest()
        .then(() => {

          dispatch(receiveKeyTestSuccess(apiKey));
          return resolve();

        }).catch((err) => {

          const error = new Error(err.response.data.message);
          error.code = err.response.data.code;

          dispatch(keyTestError(error));
          return reject(error);

        });

    });

  };

};
