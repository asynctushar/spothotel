const Room = require("../models/Room");

exports.deleteRooms = async (filterData) => {
    await Room.deleteMany({ ...filterData });

    return;
};

exports.getRooms = async (hotelId) => {
    const rooms = await Room.find({ hotel: hotelId });

    return rooms;
};

exports.getRoom = async (filterData, populateHotel = false) => {
    const filterKeys = Object.keys(filterData);
    let room = null;

    if (filterKeys.length === 1 && filterKeys[0] === "id") {
        if (populateHotel) {
            room = await Room.findById(filterData.id).populate("hotel");
        } else {
            room = await Room.findById(filterData.id);
        }
    } else {
        if (populateHotel) {
            room = await Room.findOne(filterData).populate("hotel");
        } else {
            room = await Room.findOne(filterData);
        }
    }

    return room;
};

exports.createRoom = async (newData = []) => {
    const room = await Room.create({ ...newData });

    return room;
};

exports.updateRoom = async (id, newData) => {

    const hotel = await Room.findByIdAndUpdate(id, {
        $set: {
            ...newData
        }
    }, { new: true, runValidators: true });

    return hotel;
};

exports.deleteRoom = async (id) => {
    await Room.findByIdAndDelete(id);

    return;
};