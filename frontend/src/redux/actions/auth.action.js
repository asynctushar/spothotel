import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/auth.service";

// Load current user (used on app init)
export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await authService.getMe();
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// Register
export const register = createAsyncThunk(
    "auth/register",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await authService.register(credentials);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// Login
export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await authService.login(credentials);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// Logout
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await authService.logout();
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);


// Update Profile
export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (newData, { rejectWithValue }) => {
        try {
            const { data } = await authService.updateProfile(newData);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// Change Password
export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async (newData, { rejectWithValue }) => {
        try {
            const { data } = await authService.changePassword(newData);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// Delete Profile
export const deleteProfile = createAsyncThunk(
    "auth/deleteProfile",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await authService.deleteProfile();
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);