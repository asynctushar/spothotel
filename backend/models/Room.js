const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    space: {
        type: Number,
        require: true
    },
    bedStatus: {
        type: String,
        enum: ['single', 'double'],
        required: true
    },
    bedCount: {
        type: Number,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    specification: [String],
    notAvailable: [{
        type: Date,
    }],
    pictures: [{
        public_id: String,
        url: String
    }],
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    }

}, { timestamps: true });

const Room = mongoose.model("Rooms", roomSchema);

module.exports = Room;