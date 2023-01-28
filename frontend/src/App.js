import { useEffect, useState, forwardRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Booking from './screens/Booking';
import Home from './screens/Home';
import Hotel from './screens/Hotel';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Account from './screens/Account';
import Bookings from './screens/Bookings';
import Payment from './screens/Payment';
import BookingSuccess from './screens/BookingSuccess';
import AllUsers from './screens/AllUsers';
import AllHotels from './screens/AllHotels';
import CreateHotel from './screens/CreateHotel';
import AllBookings from './screens/AllBookings';
import Dashboard from './screens/Dashboard';
import UpdateProfile from './screens/UpdateProfile.js';
import ProtectedRoute from './utils/ProtectedRoute';
import { getUserAction } from './redux/actions/userAction';
import { setError, clearError, clearSuccess } from './redux/slices/appSlice';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BookingDetails from './screens/BookingDetails';
import { Alert, Snackbar } from '@mui/material';
import UpdateHotel from './screens/UpdateHotel';
import HotelRooms from './screens/HotelRooms';
import CreateRoom from './screens/CreateRoom';
import UpdateRoom from './screens/UpdateRoom';
import SingleBookingDetails from './screens/SingleBookingDetails';
import NotFound from './screens/NotFound';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
    const [stripeApiKey, setStripeApiKey] = useState("");
    const isAuthenticated = useSelector((state) => state.userState.isAuthenticated);
    const { error, success } = useSelector((state) => state.appState);
    const dispatch = useDispatch();
    const [isStripeLoading, setStripeLoading] = useState(true);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const CustomAlert = forwardRef((props, ref) => <Alert elevation={6} variant="filled" {...props} ref={ref} />);

    useEffect(() => {
        dispatch(getUserAction());

    }, [dispatch])

    useEffect(() => {
        if (isAuthenticated) {
            const getStripeApiKey = async () => {
                try {
                    setStripeLoading(true)
                    const { data } = await axios.get('/api/v1/stripeapikey');
                    setStripeApiKey(data.stripeApiKey);
                    setStripeLoading(false)
                } catch (err) {
                    dispatch(setError(err.response.data.message));
                    setStripeLoading(false)
                }
            }
            getStripeApiKey();
        }
    }, [isAuthenticated, dispatch]);

    useEffect(() => {
        if (error) {
            setIsErrorOpen(true);

        } else if (success) {
            setIsSuccessOpen(true);
        }

    }, [error, success]);

    const handleErrorClose = () => {
        setIsErrorOpen(false);
        dispatch(clearError());
    }

    const handleSuccessClose = () => {
        setIsSuccessOpen(false);
        dispatch(clearSuccess());
    }

    return (
        <HelmetProvider>
            <Router>
                <div className="bg-slate-50 min-h-screen">
                    <Navbar />
                    <hr className=" border-t border-grey-400" />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/hotel/:id" element={<Hotel />} />
                        {!isStripeLoading &&
                            <Route path="/booking/payment" element={
                                <ProtectedRoute>
                                    <Elements stripe={loadStripe(stripeApiKey)}>
                                        <Payment />
                                    </Elements>
                                </ProtectedRoute>
                            } />
                        }
                        <Route path="/room/:id/book" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
                        <Route path="/booking/success" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />
                        <Route path="/account" element={<ProtectedRoute ><Account /> </ProtectedRoute>} />
                        <Route path="/me/update" element={<ProtectedRoute ><UpdateProfile /></ProtectedRoute>} />
                        <Route path="/me/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
                        <Route path="/me/booking/:id" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
                        <Route path="/me/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
                        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
                        <Route path="/admin/users" element={<ProtectedRoute role="admin"><AllUsers /></ProtectedRoute>} />
                        <Route path="/admin/hotels" element={<ProtectedRoute role="admin"><AllHotels /></ProtectedRoute>} />
                        <Route path="/admin/hotel/new" element={<ProtectedRoute role="admin"><CreateHotel /></ProtectedRoute>} />
                        <Route path="/admin/hotel/:id/update" element={<ProtectedRoute role="admin"><UpdateHotel /></ProtectedRoute>} />
                        <Route path="/admin/hotel/:id/rooms" element={<ProtectedRoute role="admin"><HotelRooms /></ProtectedRoute>} />
                        <Route path="/admin/hotel/:id/room/new" element={<ProtectedRoute role="admin"><CreateRoom /></ProtectedRoute>} />
                        <Route path="/admin/room/:id/update" element={<ProtectedRoute role="admin">< UpdateRoom /></ProtectedRoute>} />
                        <Route path="/admin/bookings" element={<ProtectedRoute role="admin"><AllBookings /></ProtectedRoute>} />
                        <Route path="/admin/booking/:id" element={<ProtectedRoute role="admin"><SingleBookingDetails /></ProtectedRoute>} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                    <Snackbar open={isErrorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                        <CustomAlert onClose={handleErrorClose} severity="error" className="w-fit mx-auto md:mr-auto ">{error}</CustomAlert>
                    </Snackbar>
                    <Snackbar open={isSuccessOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
                        <CustomAlert onClose={handleSuccessClose} severity="success" className="w-fit mx-auto md:mr-auto ">{success}</CustomAlert>
                    </Snackbar>
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;
