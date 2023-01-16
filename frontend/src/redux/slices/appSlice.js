import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: undefined,
    success: undefined
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
        }
    }
});

export const { setError, setSuccess, clearError, clearSuccess } = appSlice.actions;

export default appSlice.reducer;