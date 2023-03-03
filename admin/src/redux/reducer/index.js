import { combineReducers } from "redux";
import auth from "./auth";
import topic from "./topic";
const rootReducer = combineReducers({
    auth,
    topic
})

export default rootReducer;