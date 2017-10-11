import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";

import localForage from "localforage";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import Axios from "axios";

import reducers from "./reducers";

import { startRehydrate, finishRehydrate } from "./actions/rehydrate";

export default (initialState) => {

  const middleware = [thunk];

  // eslint-disable-next-line no-process-env
  if (process.env.NODE_ENV !== "production") {

    middleware.push(createLogger());

  }

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware),
      autoRehydrate()
    )
  );

  store.dispatch(startRehydrate());

  persistStore(store, {
    "storage": localForage,
    "blacklist": ["rehydrate"],
  }, () => {

    if (store.getState().authentication.userId) {

      Axios.defaults.headers.common.userId = store.getState().authentication.userId;

    }

    store.dispatch(finishRehydrate());

  });

  return store;

};
