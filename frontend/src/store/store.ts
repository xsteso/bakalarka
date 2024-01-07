import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./index";

const initialState = {};

const middleware = [thunk];

export const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);
