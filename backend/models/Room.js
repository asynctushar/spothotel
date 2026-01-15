const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    number: {
        type: Number,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['Single', 'Double', "Family"],
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    specification: {
        type: [
            {
                type: String,
                enum: {
                    values: [
                        "Air Conditioning",
                        "Private Bathroom",
                        "Flat-Screen TV",
                        "Balcony / City View",
                    ]
                    ,
                    message: "Invalid specification value",
                },
                trim: true,
            },
        ],
        required: true,
        validate: [
            {
                validator: (arr) => arr.length >= 1,
                message: "At least one specification is required",
            },
            {
                validator: (arr) => arr.length <= 4,
                message: "Maximum 4 specifications are allowed",
            },
            {
                validator: (arr) => new Set(arr).size === arr.length,
                message: "Duplicate specifications are not allowed",
            },
        ],
    },
    notAvailable: [{
        type: Date,
    }],
    pictures: [{
        public_id: String,
        url: String
    }],
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
        index: true
    }

}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;