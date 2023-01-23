import { setLoader, setUser, logoutUser, setUsersLoader, setAllUsers } from '../slices/userSlice';
import { setError } from '../slices/appSlice';
import axios from 'axios';

// sign up user
export const signUpAction = (formData) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/user/new', formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setUser(data.user));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// log in user
export const signInAction = (formData) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/login', formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setUser(data.user));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// get user
export const getUserAction = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get('/api/v1/me');

        dispatch(setUser(data.user));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
    }
}

// log out user
export const logoutAction = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.get('/api/v1/logout',);

        dispatch(logoutUser());
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// update user data
export const updateUserAction = (formData) => async (dispatch) => {
    try {
        const { data } = await axios.put('/api/v1/me', formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setUser(data.user));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// change user password
export const changePasswordAction = (formData) => async (dispatch) => {
    try {
        const { data } = await axios.put('/api/v1/me/password', formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setUser(data.user));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// delete user account
export const deleteUserAction = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.delete('/api/v1/me',);

        dispatch(logoutUser());
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// get all users -- admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(setUsersLoader(true));
        const { data } = await axios.get('/api/v1/admin/users');

        dispatch(setAllUsers(data.users));
        dispatch(setUsersLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setUsersLoader(false));
    }
}

// update user's role -- admin
export const updateUserRole = ( id, role ) => async (dispatch) => {
    try {
        const { data } = await axios.put(`/api/v1/admin/user/${id}`, { role }, { headers: { "Content-Type": "application/json" } });

        dispatch(setAllUsers(data.users));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

