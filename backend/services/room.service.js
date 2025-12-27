const Room = require("../models/Room");

exports.deleteRooms = async (filterData) => {
    await Room.deleteMany({ ...filterData });

    return;
};

exports.getRooms = async (hotelId) => {
    const rooms = await Room.find({ hotel: hotelId });

    return rooms;
};

exports.getRoom = async (filterData) => {
    const filterKeys = Object.keys(filterData);
    let room = null;

    if (filterKeys.length === 1 && filterKeys[0] === "id") {
        room = await Room.findById(filterKeys[0]);
    } else {
        room = await Room.findOne(filterData);
    }

    return room;
};

exports.createRoom = async (newData = []) => {
    const room = await Room.create({ ...newData });

    return room;
};