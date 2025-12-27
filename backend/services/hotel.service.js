const Hotel = require("../models/Hotel");

exports.createHotel = async (newData = []) => {
    const hotel = await Hotel.create({ ...newData });

    return hotel;
};

exports.getHotel = async ({ id }, populateRooms = false) => {
    let hotel = null;

    if (populateRooms) {
        hotel = await Hotel.findById(id).populate("rooms");
    } else {
        hotel = await Hotel.findById(id);
    }

    return hotel;
};

exports.updateHotel = async (id, newData) => {
    const hotel = await Hotel.findByIdAndUpdate(id, {
        $set: {
            ...newData
        }
    }, { new: true, runValidators: true });

    return hotel;
};

exports.deleteHotel = async (id) => {
    await Hotel.findByIdAndDelete(id);

    return;
};

exports.getHotels = async (filterData, populateRooms = false) => {
    let hotels = [];

    if (populateRooms) {
        hotels = await Hotel.find(filterData).populate("rooms");
    } else {
        hotels = await Hotel.find(filterData);
    }

    return hotels;
};