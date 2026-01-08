import { createSlice } from "@reduxjs/toolkit";
import { login, logout, loadUser, register, updateProfile, changePassword, deleteProfile } from "../actions/auth.action";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    checkingAuth: true
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // loadUser
            .addCase(loadUser.pending, (state) => {
                state.checkingAuth = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.checkingAuth = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loadUser.rejected, (state) => {
                state.checkingAuth = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
            })

            // login
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
            })

            // logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
            })

            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(updateProfile.rejected, (state) => {
                state.loading = false;
            })

            // Change Password
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(changePassword.rejected, (state) => {
                state.loading = false;
            })

            // Delete Profile
            .addCase(deleteProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProfile.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(deleteProfile.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { } = authSlice.actions;
export default authSlice.reducer;
