const express = require('express');
const { uploadRoomPictures, updateRoom, deleteRoom, getRoomDetails } = require('../controllers/room.controller');
const imageUpload = require('../middlewares/imageUpload');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();


router.route('/:id/images').put(isAuthenticatedUser, authorizedRole('admin'), imageUpload('pictures'), uploadRoomPictures);
router.route('/:id').put(isAuthenticatedUser, authorizedRole('admin'), updateRoom).delete(isAuthenticatedUser, authorizedRole('admin'), deleteRoom).get(getRoomDetails);



module.exports = router;