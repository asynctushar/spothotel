const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: String
}, { timestamps: true });

const Hotel = mongoose.model("Hotels", hotelSchema);


module.exports = Hotel;