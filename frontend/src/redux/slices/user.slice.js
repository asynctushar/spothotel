import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: undefined,
    allUsers: [],
    isUsersLoading: true
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
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setUsersLoader: (state, action) => {
            state.isUsersLoading = action.payload;
        }
    }
});

export const { setLoader, setUser, logoutUser, setBookings, setAllUsers, setUsersLoader } = userSlice.actions;

export default userSlice.reducer;