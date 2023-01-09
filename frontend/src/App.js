import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Booking from './screens/Booking';
import Home from './screens/Home';
import Hotel from './screens/Hotel';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

const App = () => {
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
