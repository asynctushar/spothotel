const express = require('express');
const { createHotel, createHotelRoom, getHotelRooms, uploadHotelPictures, updateHotel, deleteHotel, getHotelDetails, getAllHotels, getAllHotels2 } = require('../controllers/hotel.controller');
const imageUpload = require('../middlewares/imageUpload');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/:id/images').put(isAuthenticatedUser, authorizedRole('admin'), imageUpload('pictures'), uploadHotelPictures);
router.route('/:id/rooms').get(getHotelRooms).post(isAuthenticatedUser, authorizedRole('admin'), createHotelRoom);
router.route('/:id').put(isAuthenticatedUser, authorizedRole('admin'), updateHotel).delete(isAuthenticatedUser, authorizedRole('admin'), deleteHotel).get(getHotelDetails);
router.route('/').post(isAuthenticatedUser, authorizedRole('admin'), createHotel).get(getAllHotels);

module.exports = router;