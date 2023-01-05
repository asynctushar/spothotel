const Hotel = require('../models/Hotel');

exports.createHotel = async (req, res, next) => {
    console.log('routes working');

    const hotel = await Hotel.create({
        name: "Burge Khalifa"
    })

    res.status(201).json({
        success: true,
        hotel
    })
}