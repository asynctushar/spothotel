import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: undefined,
    success: undefined,
    isAdminbarOpen: true
}

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
    }
});

export const { setError, setSuccess, clearError, clearSuccess , setAdminbar} = appSlice.actions;

export default appSlice.reducer;