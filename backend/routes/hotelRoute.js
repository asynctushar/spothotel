const { Router } = require('express');
const express = require('express');
const { createHotel, uploadHotelPictures } = require('../controllers/hotelController');
const imageUpload = require('../middlewares/imageUpload');

const router = express.Router();

router.route('/hotel/new').post(createHotel);
router.route('/hotel/:id/images').put(imageUpload('pictures'), uploadHotelPictures)

module.exports = router;