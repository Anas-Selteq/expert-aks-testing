import { createStore } from "redux";
import { authReducer } from "../Reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(authReducer, composeWithDevTools());
