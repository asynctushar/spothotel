const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Hotel name is required"],
        trim: true,
        maxlength: [40, "Hotel name cannot exceed 40 characters"],
        minlength: [4, "Hotel name must be at least 4 characters"],
    },

    location: {
        type: String,
        required: [true, "Hotel location is required"],
        trim: true,
        maxlength: [30, "Location cannot exceed 30 characters"],
    },

    distance: {
        type: String,
        required: [true, "Distance from destination is required"],
        trim: true,
        maxlength: [30, "Distance cannot exceed 30 characters"],
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
        required: [true, "Hotel description is required"],
        trim: true,
        maxlength: [250, "Description cannot exceed 250 characters"],
        minlength: [20, "Description must be at least 20 characters"],
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