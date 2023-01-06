const express = require('express');
const { createRoom, uploadRoomPictures, updateRoom, deleteRoom, getRoomDetails, getAllRooms } = require('../controllers/roomController');
const imageUpload = require('../middlewares/imageUpload');

const router = express.Router();

router.route('/hotel/:id/room/new').post(createRoom);
router.route('/room/:id/images').put(imageUpload('pictures'), uploadRoomPictures);
router.route('/rooms').get(getAllRooms);
router.route('/room/:id').put(updateRoom).delete(deleteRoom).get(getRoomDetails);



module.exports = router;