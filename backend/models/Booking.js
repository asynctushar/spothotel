const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms",
        required: true
    },
    dates: [{
        type: Date,
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    paidAt: {
        type: Date,
        required: true
    },
    paymentInfo: {
        id: String,
        status: String
    },
    status: {
        type: String,
        enum: ['Processing', 'Checked', 'Complete'],
        default: 'Processing'
    }
}, { timestamps: true });

const Booking = mongoose.model("Bookings", bookingSchema);

module.exports = Booking;