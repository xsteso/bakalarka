import {
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	USER_LOADING,
} from "./types";

const initialState = {
	token: localStorage.getItem("token"),
	isLoading: false,
	isAuthenticated: false,
	loginError: false,
	user: null,
};

export const authReducer = (state = initialState, action) => {
	state.loginError = false;

	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case USER_LOADED:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				user: action.payload,
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				isLoading: false,
				isAuthenticated: true,
			};
		case LOGIN_FAIL:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				loginError: true,
				isLoading: false,
				isAuthenticated: false,
			};
		case AUTH_ERROR:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isLoading: false,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};
