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
