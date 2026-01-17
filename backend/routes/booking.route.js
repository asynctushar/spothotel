const express = require('express');
const { createBooking, updateBooking, getOwnBookings, getOwnBookingDetails, getBookingDetails, getAllBookings, sendStripePublicApiKey, createPayment } = require('../controllers/booking.controller');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/hotels/:id/rooms/:room').post(isAuthenticatedUser, createBooking);
router.route('/me').get(isAuthenticatedUser, getOwnBookings);
router.route('/stripepublicapikey').get(isAuthenticatedUser, sendStripePublicApiKey);
router.route('/payment').post(isAuthenticatedUser, createPayment);;
router.route('/:id/me').get(isAuthenticatedUser, getOwnBookingDetails);
router.route('/:id').put(isAuthenticatedUser, authorizedRole('admin'), updateBooking).get(isAuthenticatedUser, authorizedRole('admin'), getBookingDetails);
router.route('/').get(isAuthenticatedUser, authorizedRole("admin"), getAllBookings);

module.exports = router;