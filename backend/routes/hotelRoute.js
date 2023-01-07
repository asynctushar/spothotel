const express = require('express');
const { createHotel, uploadHotelPictures, updateHotel, deleteHotel, getHotelDetails, getAllHotels } = require('../controllers/hotelController');
const imageUpload = require('../middlewares/imageUpload');

const router = express.Router();

router.route('/hotel/new').post(createHotel);
router.route('/hotel/:id/images').put(imageUpload('pictures'), uploadHotelPictures);
router.route('/hotels').get(getAllHotels);
router.route('/hotel/:id').put(updateHotel).delete(deleteHotel).get(getHotelDetails);

module.exports = router;