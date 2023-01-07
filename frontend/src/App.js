import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Booking from './screens/Booking';
import Home from './screens/Home';
import Hotel from './screens/Hotel';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/hotel/:id" element={<Hotel />} />
                <Route path="/hotel/:id/:room/book" element={<Booking />} />
            </Routes>
        </Router>
    );
}

export default App;
