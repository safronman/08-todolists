import {applyMiddleware, combineReducers, createStore} from "redux";
import todolistReducer from "./todolistReducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk, {ThunkMiddleware} from "redux-thunk";
import {AppActions} from "../types/actions";

const rootReducer = combineReducers({
    todolistReducer
});

export type AppState = ReturnType<typeof rootReducer>

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)));
export default store;