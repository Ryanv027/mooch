import { combineReducers } from "redux";
import authReducer from "./auth";
import groupsReducer from "./groups";

const rootReducer = combineReducers({
  auth: authReducer,
  groups: groupsReducer
});

export default rootReducer;
