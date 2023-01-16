const express = require('express');
const { createBooking, updateBooking, getOwnBookings, getOwnBookingDetails, getBookingDetails, getAllBookings, sendStripeApiKey, sendStripeSecretKey } = require('../controllers/bookingController');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/hotel/:id/:room/book').post(isAuthenticatedUser, createBooking);
router.route('/booking/:id').put(isAuthenticatedUser, authorizedRole('admin'), updateBooking).get(isAuthenticatedUser, authorizedRole('admin'), getBookingDetails);
router.route('/bookings').get(isAuthenticatedUser, authorizedRole("admin"), getAllBookings);
router.route('/me/bookings').get(isAuthenticatedUser, getOwnBookings);
router.route('/me/booking/:id').get(isAuthenticatedUser, getOwnBookingDetails);
router.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey);
router.route('/stripeclientkey').post(isAuthenticatedUser, sendStripeSecretKey);;

module.exports = router;