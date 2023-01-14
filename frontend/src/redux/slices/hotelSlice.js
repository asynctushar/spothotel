import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    hotels: undefined,
    hotel: undefined,
    hasSearched: false,
    room: undefined
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
        },
        setHotel: (state, action) => {
            state.hotel = action.payload;
        },
        setRoom: (state, action) => {
            state.room = action.payload;
        }
    }
});

export const { setLoader, setHotels, setHasSearched , setHotel, setRoom} = hotelSlice.actions;

export default hotelSlice.reducer;