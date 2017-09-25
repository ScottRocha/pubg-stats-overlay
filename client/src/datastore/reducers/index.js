import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import authentication from "./authentication";
import rehydrate from "./rehydrate";

const rootReducer = combineReducers({
  authentication,
  rehydrate,
  "routing": routerReducer,
});

export default rootReducer;
