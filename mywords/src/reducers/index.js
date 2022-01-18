import { combineReducers } from "redux";
import storyReducer from "./storyReducer";
import userReducer  from "./userReducer"

const rootReducer = combineReducers({
    userState: userReducer, 
    storyState: storyReducer    
})

export default rootReducer;