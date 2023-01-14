const express = require('express');
const { createHotel, uploadHotelPictures, updateHotel, deleteHotel, getHotelDetails, getAllHotels } = require('../controllers/hotelController');
const imageUpload = require('../middlewares/imageUpload');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/hotel/new').post(isAuthenticatedUser, authorizedRole('admin') ,createHotel);
router.route('/hotel/:id/images').put(isAuthenticatedUser, authorizedRole('admin'),imageUpload('pictures'), uploadHotelPictures);
router.route('/hotels').get(getAllHotels);
router.route('/hotel/:id').put(isAuthenticatedUser, authorizedRole('admin'),updateHotel).delete(isAuthenticatedUser, authorizedRole('admin'), deleteHotel).get(getHotelDetails);

module.exports = router;