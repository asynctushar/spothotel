import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Booking from './screens/Booking';
import Home from './screens/Home';
import Hotel from './screens/Hotel';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Account from './screens/Account';
import Bookings from './screens/Bookings';
import UpdateProfile from './screens/UpdateProfile.js';
import ProtectedRoute from './utils/ProtectedRoute';
import { getUserAction } from './redux/actions/userAction';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserAction());
    }, [dispatch])

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
                    <Route path="/hotel/:id/:room/book" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
                    <Route path="/account" element={<ProtectedRoute ><Account /> </ProtectedRoute>} />
                    <Route path="/me/update" element={<ProtectedRoute ><UpdateProfile /></ProtectedRoute>} />
                    <Route path="/me/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
