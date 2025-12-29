import {
	setLoader,
	setUser,
	logoutUser,
	setUsersLoader,
	setAllUsers,
} from "../slices/user.slice";
import { setError } from "../slices/app.slice";
import axios from "axios";

// update user data
export const updateUserAction = (formData) => async (dispatch) => {
	try {
		const { data } = await axios.put(
			process.env.REACT_APP_API_URL + "/api/v2/users/me",
			formData,
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			}
		);

		dispatch(setUser(data.user));
	} catch (err) {
		dispatch(setError(err.response.data.message));
	}
};

// change user password
export const changePasswordAction = (formData) => async (dispatch) => {
	try {
		const { data } = await axios.put(
			process.env.REACT_APP_API_URL + "/api/v2/users/me/password",
			formData,
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			}
		);

		dispatch(setUser(data.user));
	} catch (err) {
		dispatch(setError(err.response.data.message));
	}
};

// delete user account
export const deleteUserAction = () => async (dispatch) => {
	try {
		dispatch(setLoader(true));
		await axios.delete(process.env.REACT_APP_API_URL + "/api/v2/users/me", {
			withCredentials: true,
		});

		dispatch(logoutUser());
		dispatch(setLoader(false));
	} catch (err) {
		dispatch(setError(err.response.data.message));
		dispatch(setLoader(false));
	}
};

// get all users -- admin
export const getAllUsers = () => async (dispatch) => {
	try {
		dispatch(setUsersLoader(true));
		const { data } = await axios.get(
			process.env.REACT_APP_API_URL + "/api/v2/users",
			{ withCredentials: true }
		);

		dispatch(setAllUsers(data.users));
		dispatch(setUsersLoader(false));
	} catch (err) {
		dispatch(setError(err.response.data.message));
		dispatch(setUsersLoader(false));
	}
};

// update user's role -- admin
export const updateUserRole = (id, role) => async (dispatch) => {
	try {
		const { data } = await axios.put(
			process.env.REACT_APP_API_URL + `/api/v2/users/${id}`,
			{ role },
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			}
		);

		dispatch(setAllUsers(data.users));
	} catch (err) {
		dispatch(setError(err.response.data.message));
	}
};
