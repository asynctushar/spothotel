import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: undefined
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true
        },
        logoutUser: (state, action) => {
            state.user = undefined;
            state.isAuthenticated = false;
        }
    }
});

export const { setLoader, setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;