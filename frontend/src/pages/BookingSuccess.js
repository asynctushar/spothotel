import { Fragment, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Meta from '../utils/Meta';

const BookingSuccess = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (state && state.success) {
            sessionStorage.removeItem('bookingDetails');
        }
    }, [state]);


    return (
        <Fragment>
            <Meta title="Booking Success" />
            <Fragment>
                {!state?.success ? <Navigate to="/me/bookings" /> : (
                    <div className="flex flex-col justify-center items-center h-[calc(100vh-97px)]">
                        <h2 className="text-2xl -mt-48 mb-6 text-center">Room booked successfully.</h2>
                        <button className="bg-red-400 hover:bg-red-500 py-3 px-6 rounded text-green-50 transition duration-200" onClick={() => navigate('/me/bookings', { replace: true })}>Your Bookings</button>
                    </div>)}
            </Fragment>
        </Fragment>

    );
};
export default BookingSuccess;