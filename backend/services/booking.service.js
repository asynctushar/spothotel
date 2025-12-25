const Booking = require("../models/Booking");

exports.deleteBookings = async (filterData) => {
    await Booking.deleteMany({ ...filterData });

    return;
};