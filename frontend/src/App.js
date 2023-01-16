import { useEffect, useState } from 'react';
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
import UpdateProfile from './screens/UpdateProfile.js';
import ProtectedRoute from './utils/ProtectedRoute';
import { getUserAction } from './redux/actions/userAction';
import { setError } from './redux/slices/appSlice';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BookingDetails from './screens/BookingDetails';

const App = () => {

    const [stripeApiKey, setStripeApiKey] = useState("");
    const isAuthenticated = useSelector((state) => state.userState.isAuthenticated);
    const dispatch = useDispatch();
    const [isStripeLoading, setStripeLoading] = useState(true);

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
    }, [isAuthenticated, dispatch])

    return (
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
                    <Route path="/hotel/:id/:room/book" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
                    <Route path="/booking/success" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />
                    <Route path="/account" element={<ProtectedRoute ><Account /> </ProtectedRoute>} />
                    <Route path="/me/update" element={<ProtectedRoute ><UpdateProfile /></ProtectedRoute>} />
                    <Route path="/me/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
                    <Route path="/me/booking/:id" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
