const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    distance: {
        type: String,
        require: true,
        trim: true
    },
    specification: [String],
    description: {
        type: String,
        required: true,
        trim: true
    },
    pictures: [{
        public_id: String,
        url: String
    }],
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms"
    }]

}, { timestamps: true });

const Hotel = mongoose.model("Hotels", hotelSchema);


module.exports = Hotel;