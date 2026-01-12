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

exports.getHotels = async (filterData = {}, pipeline = [], populateQuery = []) => {
    let hotels = [];

    // 🔹 Aggregation mode
    if (Array.isArray(pipeline) && pipeline.length > 0) {
        hotels = await Hotel.aggregate(pipeline);
    }

    hotels = await Hotel.find(filterData).populate(populateQuery);


    return hotels;
};

exports.getHotels = async (
    filterData = {},
    pipeline = [],
    populateQuery = []
) => {

    // 🔹 Aggregation mode
    if (Array.isArray(pipeline) && pipeline.length > 0) {
        return await Hotel.aggregate(pipeline);
    }

    // 🔹 Normal find mode
    const hotels = Hotel.find(filterData).populate(populateQuery);

    return hotels;
};

