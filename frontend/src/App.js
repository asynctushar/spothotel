import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Booking from './screens/Booking';
import Home from './screens/Home';
import Hotel from './screens/Hotel';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import {getUserAction } from './redux/actions/userAction';

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
                    <Route path="/hotel/:id/:room/book" element={<Booking />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
