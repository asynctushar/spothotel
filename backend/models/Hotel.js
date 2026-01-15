const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    location: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    distance: {
        type: String,
        require: true,
        trim: true,
        maxlength: 50,
    },
    specification: {
        type: [
            {
                type: String,
                enum: {
                    values: [
                        "Free Wi-Fi in Public Areas",
                        "On-site Restaurant",
                        "24-Hour Front Desk",
                        "Free Parking",
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
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    pictures: [{
        public_id: String,
        url: String
    }],
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }],
    featured: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const Hotel = mongoose.model("Hotel", hotelSchema);


module.exports = Hotel;