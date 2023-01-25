import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    hotels: undefined,
    hotel: undefined,
    hasSearched: false,
    room: undefined,
    booking: undefined,
    hasBooked: false,
    bookings: [],
    allHotels: [],
    isHotelCreated: false,
    isRoomCreated: false,
    isHotelUpdated: false,
    isRoomUpdated: false,
    allBookings: []
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
        },
        setBookings: (state, action) => {
            state.bookings = action.payload;
        },
        setHasBooked: (state, action) => {
            state.hasBooked = action.payload;
        },
        setBooking: (state, action) => {
            state.booking = action.payload;
        },
        setAllHotels: (state, action) => {
            state.allHotels = action.payload;
        },
        setIsHotelCreated: (state, action) => {
            state.isHotelCreated = action.payload;
        },
        setIsRoomCreated: (state, action) => {
            state.isRoomCreated = action.payload;
        },
        setIsHotelUPdated: (state, action) => {
            state.isHotelUpdated = action.payload;
        },
        setIsRoomUpdated: (state, action) => {
            state.isRoomUpdated = action.payload;
        },
        setAllBookings: (state, action) => {
            state.allBookings = action.payload;
        }
    }
});

export const { setLoader, setHotels, setHasSearched , setHotel, setRoom, setBookings, setHasBooked, setBooking, setAllHotels, setIsHotelCreated, setIsRoomCreated, setIsHotelUPdated, setIsRoomUpdated, setAllBookings} = hotelSlice.actions;

export default hotelSlice.reducer;