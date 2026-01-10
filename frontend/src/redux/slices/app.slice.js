import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, updateProfile, changePassword, deleteProfile } from '../actions/auth.action';

const initialState = {
    error: undefined,
    success: undefined,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state, action) => {
            state.error = undefined;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        clearSuccess: (state, action) => {
            state.success = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register 
            .addCase(register.fulfilled, (state, action) => {
                state.success = action.payload.message;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload;
            })

            // login 
            .addCase(login.fulfilled, (state, action) => {
                state.success = action.payload.message;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Logout 
            .addCase(logout.fulfilled, (state, action) => {
                state.success = action.payload.message;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Update Profile
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.success = action.payload.message;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Change Password 
            .addCase(changePassword.fulfilled, (state, action) => {
                state.success = action.payload.message;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Delete Profile 
            .addCase(deleteProfile.fulfilled, (state, action) => {
                state.success = action.payload.message;
            })
            .addCase(deleteProfile.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { setError, setSuccess, clearError, clearSuccess } = appSlice.actions;

export default appSlice.reducer;