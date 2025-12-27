const Booking = require("../models/Booking");

exports.deleteBookings = async (filterData = {}) => {
    await Booking.deleteMany({ ...filterData });

    return;
};

exports.createBooking = async (newData = {}) => {
    const booking = await Booking.create(newData);

    return booking;
};

exports.getBooking = async (filterData = {}, populateQuery = []) => {
    const filterKeys = Object.keys(filterData);
    let booking = null;

    if (filterKeys.length === 1 && filterKeys[0] === "id") {
        booking = await Booking.findById(filterData.id).populate(populateQuery);
    } else {
        booking = await Booking.findOne(filterData).populate(populateQuery);

    }

    return booking;
};

exports.getBookings = async (filterData = {}, populateQuery = []) => {
    const bookings = await Booking.find(filterData).populate(populateQuery);

    return bookings;
};

exports.updateBooking = async (id, newData = {}) => {
    const booking = await Booking.findByIdAndUpdate(id, {
        $set: {
            ...newData
        }
    }, { new: true, runValidators: true });

    return booking;
};
