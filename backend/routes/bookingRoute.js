const express = require('express');
const { createBooking } = require('../controllers/bookingController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/hotel/:id/:room/book').post(isAuthenticatedUser, createBooking);

module.exports = router;