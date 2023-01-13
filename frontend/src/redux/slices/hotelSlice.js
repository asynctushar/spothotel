import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    hotels: undefined,
    hasSearched: false,
}

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        setHotels: (state, action) => {
            state.hotels = action.payload;
        },
        setHasSearched: (state, action) => {
            state.hasSearched = action.payload;
        }
    }
});

export const { setLoader, setHotels, setHasSearched } = hotelSlice.actions;

export default hotelSlice.reducer;