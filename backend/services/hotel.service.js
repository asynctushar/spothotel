const Hotel = require("../models/Hotel");

exports.createHotel = async (newData = {}) => {
    const hotel = await Hotel.create({ ...newData });

    return hotel;
};

exports.getHotel = async ({ id }, populateQuery = []) => {
    let hotel = null;
    hotel = await Hotel.findById(id).populate(populateQuery);

    return hotel;
};

exports.updateHotel = async (id, newData = {}) => {
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

exports.getHotels = async (filterData = {}, populateQuery = []) => {
    let hotels = [];
    hotels = await Hotel.find(filterData).populate(populateQuery);


    return hotels;
};