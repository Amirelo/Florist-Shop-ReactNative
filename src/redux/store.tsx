import { combineReducers, createStore } from "redux";
import LoginReducer from "./reducers/LoginReducer";
import PreferenceReducer from "./reducers/PreferenceReducer";


const rootReducer = combineReducers({
    isLoggedIn: LoginReducer,
    preference: PreferenceReducer,
});

export const store = createStore(rootReducer)