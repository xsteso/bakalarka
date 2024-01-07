import axios from "axios";
import {
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	USER_LOADED,
	USER_LOADING,
} from "./types";

// Check token and load user from API
export const loadUser = () => (dispatch, getState) => {
	// User is loading
	dispatch({ type: USER_LOADING });

	axios
		.get("/api/auth/user/", tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		})
		.catch(() => {
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

// Login User
export const login = (username, password) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	// Request Body
	const body = JSON.stringify({ username, password });

	axios
		.post("/api/auth/login/", body, config)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
		})
		.catch(() => {
			dispatch({
				type: LOGIN_FAIL,
			});
		});
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
	axios
		.post("/api/auth/logout/", null, tokenConfig(getState))
		.then(() => {
			dispatch({
				type: LOGOUT_SUCCESS,
			});
		})
		.catch(() => location.reload());
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
	// Get token from state
	const token = getState().auth.token;

	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	// If token exists, add to headers config
	if (token) {
		config.headers["Authorization"] = `Token ${token}`;
	}

	return config;
};
