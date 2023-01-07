import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: undefined
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setError } = appSlice.actions;

export default appSlice.reducer;