import {createStore} from "redux";
import todolistReducer from "./todolistReducer";

let store = createStore(todolistReducer);
export default store;