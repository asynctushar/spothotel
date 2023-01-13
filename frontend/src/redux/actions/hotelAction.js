import { setError } from '../slices/appSlice';
import { setLoader, setHotels, setHasSearched} from '../slices/hotelSlice';
import axios from 'axios';

// search hotel
export const searchHotelsAction = ({location, person, room, d1, d2}) => async (dispatch) => {
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