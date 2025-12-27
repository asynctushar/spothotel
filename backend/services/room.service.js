const Room = require("../models/Room");

exports.deleteRooms = async (filterData) => {
    await Room.deleteMany({ ...filterData });

    return;
};