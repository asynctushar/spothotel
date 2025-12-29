import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register } from '../actions/auth.action';

const initialState = {
    error: undefined,
    success: undefined,
    isAdminbarOpen: true
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
        setAdminbar: (state, action) => {
            state.isAdminbarOpen = action.payload;
        }
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
            });
    }
});

export const { setError, setSuccess, clearError, clearSuccess, setAdminbar } = appSlice.actions;

export default appSlice.reducer;