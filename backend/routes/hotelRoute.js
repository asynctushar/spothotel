const { Router } = require('express');
const express = require('express');
const { createHotel } = require('../controllers/hotelController');

const router = express.Router();

router.route('/hotel/new').post(createHotel);

module.exports = router;