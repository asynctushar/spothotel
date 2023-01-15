import { setError } from '../slices/appSlice';
import { setLoader, setHotels, setHasSearched, setHotel, setRoom, setBooking ,setHasBooked} from '../slices/hotelSlice';
import axios from 'axios';

// search hotel
export const searchHotelsAction = ({ location, person, room, d1, d2 }) => async (dispatch) => {
    try {
        dispatch(setHasSearched(true));
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/hotels?location=${location}&person=${person}&room=${room}&d1=${d1}&d2=${d2}`);

        dispatch(setHotels(data.hotels));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// get featured hotels
export const getFeturedHotels = () => async (dispatch) => {
    try {
        dispatch(setHasSearched(false));
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/hotels`);

        dispatch(setHotels(data.hotels));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// get hotel details
export const getHotelAction = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/hotel/${id}`);

        dispatch(setHotel(data.hotel));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// get room details
export const getRoomAction = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/room/${id}`);
        dispatch(setRoom(data.room));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// new booking
export const newBookingAction = (formData, hotelId, roomId) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/v1/hotel/${hotelId}/${roomId}/book`, formData, { headers: { "Content-Type": "application/json" } })

        dispatch(setBooking(data.booking));
        dispatch(setHasBooked(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}