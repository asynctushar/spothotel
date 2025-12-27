const express = require('express');
const { createHotel, uploadHotelPictures, updateHotel, deleteHotel, getHotelDetails, getAllHotels } = require('../controllers/hotel.controller');
const imageUpload = require('../middlewares/imageUpload');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/:id/images').put(isAuthenticatedUser, authorizedRole('admin'), imageUpload('pictures'), uploadHotelPictures);
router.route('/:id').put(isAuthenticatedUser, authorizedRole('admin'), updateHotel).delete(isAuthenticatedUser, authorizedRole('admin'), deleteHotel).get(getHotelDetails);
router.route('/').post(isAuthenticatedUser, authorizedRole('admin'), createHotel).get(getAllHotels);

module.exports = router;