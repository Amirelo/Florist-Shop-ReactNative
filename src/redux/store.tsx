import { combineReducers, createStore } from "redux";
import LoginReducer from "./reducers/LoginReducer";


const rootReducer = combineReducers({
    isLoggedIn: LoginReducer,
});

export const store = createStore(rootReducer)