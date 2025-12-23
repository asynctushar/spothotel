import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Meta from '../utils/Meta';

const BookingSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('bookingDetails');
    }, []);

    return (
        <Fragment>
            <Meta title="Booking Success" />
            <div className="flex flex-col justify-center items-center h-[calc(100vh-97px)]">
                <h2 className="text-2xl -mt-48 mb-6 text-center">Room booked successfully.</h2>
                <button className="bg-red-400 hover:bg-red-500 py-3 px-6 rounded text-green-50 transition duration-200" onClick={() => navigate('/me/bookings')}>Your Bookings</button>
            </div>
        </Fragment>
    )
}
export default BookingSuccess;