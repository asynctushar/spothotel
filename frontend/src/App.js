import { useEffect, useState, forwardRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";
import AllUsers from "./pages/AllUsers";
import AllHotels from "./pages/AllHotels";
import CreateHotel from "./pages/CreateHotel";
import AllBookings from "./pages/AllBookings";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfile.js";
import ProtectedRoute from "./utils/ProtectedRoute";
import { loadUser } from "./redux/actions/auth.action";
import { setError, clearError, clearSuccess } from "./redux/slices/app.slice";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BookingDetails from "./pages/BookingDetails";
import { Alert, Snackbar } from "@mui/material";
import UpdateHotel from "./pages/UpdateHotel";
import HotelRooms from "./pages/HotelRooms";
import CreateRoom from "./pages/CreateRoom";
import UpdateRoom from "./pages/UpdateRoom";
import SingleBookingDetails from "./pages/SingleBookingDetails";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
	const [stripeApiKey, setStripeApiKey] = useState("");
	const isAuthenticated = useSelector(
		(state) => state.authState.isAuthenticated
	);
	const { error, success } = useSelector((state) => state.appState);
	const dispatch = useDispatch();
	const [isStripeLoading, setStripeLoading] = useState(true);
	const [isErrorOpen, setIsErrorOpen] = useState(false);
	const [isSuccessOpen, setIsSuccessOpen] = useState(false);
	const CustomAlert = forwardRef((props, ref) => (
		<Alert elevation={6} variant="filled" {...props} ref={ref} />
	));

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	useEffect(() => {
		if (isAuthenticated) {
			const getStripeApiKey = async () => {
				try {
					setStripeLoading(true);
					const { data } = await axios.get(
						process.env.REACT_APP_API_URL + "/api/v2/bookings/stripepublicapikey",
						{ withCredentials: true }
					);
					setStripeApiKey(data.stripeApiKey);
					setStripeLoading(false);
				} catch (err) {
					dispatch(setError(err.response.data.message));
					setStripeLoading(false);
				}
			};

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
	};

	const handleSuccessClose = () => {
		setIsSuccessOpen(false);
		dispatch(clearSuccess());
	};

	return (
		<HelmetProvider>
			<Router>
				<div className="bg-slate-50 min-h-screen">
					<Navbar />
					<hr className=" border-t border-grey-400" />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/hotel/:id" element={<Hotel />} />
						{!isStripeLoading && (
							<Route
								path="/booking/payment"
								element={
									<ProtectedRoute>
										<Elements
											stripe={loadStripe(stripeApiKey)}
										>
											<Payment />
										</Elements>
									</ProtectedRoute>
								}
							/>
						)}
						<Route
							path="/room/:id/book"
							element={
								<ProtectedRoute>
									<Booking />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/booking/success"
							element={
								<ProtectedRoute>
									<BookingSuccess />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/account"
							element={
								<ProtectedRoute>
									<Account />{" "}
								</ProtectedRoute>
							}
						/>
						<Route
							path="/me/update"
							element={
								<ProtectedRoute>
									<UpdateProfile />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/me/bookings"
							element={
								<ProtectedRoute>
									<Bookings />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/me/booking/:id"
							element={
								<ProtectedRoute>
									<BookingDetails />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/me/bookings"
							element={
								<ProtectedRoute>
									<Bookings />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/dashboard"
							element={
								<ProtectedRoute role="admin">
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/users"
							element={
								<ProtectedRoute role="admin">
									<AllUsers />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/hotels"
							element={
								<ProtectedRoute role="admin">
									<AllHotels />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/hotel/new"
							element={
								<ProtectedRoute role="admin">
									<CreateHotel />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/hotel/:id/update"
							element={
								<ProtectedRoute role="admin">
									<UpdateHotel />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/hotel/:id/rooms"
							element={
								<ProtectedRoute role="admin">
									<HotelRooms />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/hotel/:id/room/new"
							element={
								<ProtectedRoute role="admin">
									<CreateRoom />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/room/:id/update"
							element={
								<ProtectedRoute role="admin">
									<UpdateRoom />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/bookings"
							element={
								<ProtectedRoute role="admin">
									<AllBookings />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/booking/:id"
							element={
								<ProtectedRoute role="admin">
									<SingleBookingDetails />
								</ProtectedRoute>
							}
						/>
						<Route path="/*" element={<NotFound />} />
					</Routes>
					<Snackbar
						open={isErrorOpen}
						autoHideDuration={3000}
						onClose={handleErrorClose}
					>
						<CustomAlert
							onClose={handleErrorClose}
							severity="error"
							className="w-fit mx-auto md:mr-auto "
						>
							{error}
						</CustomAlert>
					</Snackbar>
					<Snackbar
						open={isSuccessOpen}
						autoHideDuration={3000}
						onClose={handleSuccessClose}
					>
						<CustomAlert
							onClose={handleSuccessClose}
							severity="success"
							className="w-fit mx-auto md:mr-auto "
						>
							{success}
						</CustomAlert>
					</Snackbar>
				</div>
			</Router>
		</HelmetProvider>
	);
};

export default App;
