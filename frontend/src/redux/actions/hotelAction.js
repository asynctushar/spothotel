import { setError, setSuccess } from '../slices/appSlice';
import { setLoader, setHotels, setHasSearched, setHotel, setRoom, setBookings, setHasBooked, setBooking, setAllHotels, setIsHotelCreated, setIsRoomCreated, setIsHotelUPdated, setIsRoomUpdated, setAllBookings } from '../slices/hotelSlice';
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
        await axios.post(`/api/v1/hotel/${hotelId}/${roomId}/book`, formData, { headers: { "Content-Type": "application/json" } })

        dispatch(setHasBooked(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// users bookings
export const getUsersBookings = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get('/api/v1/me/bookings');

        dispatch(setBookings(data.bookings));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// users booking details
export const getUserBooking = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/me/booking/${id}`);

        dispatch(setBooking(data.booking));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// get all hotels -- admin
export const getAllHotels = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/hotels`);

        dispatch(setAllHotels(data.hotels));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// upload hotel picture --admin
export const uploadHotelPicture = (formData, id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.put(`/api/v1/hotel/${id}/images`, formData, { headers: { "Content-Type": "multipart/form-data" } });

        dispatch(setSuccess("Image uploaded successfully"));
        dispatch(setHasSearched(false));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// upload room picture --admin
export const uploadRoomPicture = (formData, id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.put(`/api/v1/room/${id}/images`, formData, { headers: { "Content-Type": "multipart/form-data" } });

        dispatch(setSuccess("Image uploaded successfully"));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// delete hotel -- admin
export const deleteHotel = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.delete(`/api/v1/hotel/${id}`);

        dispatch(setAllHotels(data.hotels));
        dispatch(setSuccess("Hotel deleted successfully"));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// delete room -- admin
export const deleteRoom = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.delete(`/api/v1/room/${id}`);

        dispatch(setHotel(data.hotel));
        dispatch(setSuccess("Room deleted successfully"));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// create new hotel --admin
export const createHotel = (formData) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.post(`/api/v1/hotel/new`, formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setSuccess("Hotel Created successfully"));
        dispatch(setIsHotelCreated(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// update hotel --admin
export const updateHotel = (formData, hotelId) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.put(`/api/v1/hotel/${hotelId}`, formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setSuccess("Hotel Updated successfully"));
        dispatch(setIsHotelUPdated(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// create new room --admin
export const createRoom = (formData, hotelId) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.post(`/api/v1/hotel/${hotelId}/room/new`, formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setSuccess("Room Created successfully"));
        dispatch(setIsRoomCreated(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// update room --admin
export const updateRoom = (formData, roomId) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.put(`/api/v1/room/${roomId}`, formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setSuccess("Room Updated successfully"));
        dispatch(setIsRoomUpdated(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// get all bookings -- admin
export const getAllBookings = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/bookings`);

        dispatch(setAllBookings(data.bookings));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// change booking status --admin
export const changeBookingStatus = (status, bookingId) => async (dispatch) => {
    try {
        const { data } = await axios.put(`/api/v1/booking/${bookingId}`, { status }, { headers: { "Content-Type": "application/json" } });

        dispatch(setAllBookings(data.bookings));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// get booking details -- admin
export const getBookingDetails = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/booking/${id}`);

        dispatch(setBooking(data.booking));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}