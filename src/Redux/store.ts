import {createStore} from "redux";
import todolistReducer from "./todolistReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

let store = createStore(todolistReducer, composeWithDevTools());
export default store;