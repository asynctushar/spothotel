const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// new booking
exports.createBooking = catchAsyncErrors(async (req, res, next) => {
    const { paymentInfo, dates, totalPrice, phone } = req.body;

    // validation of payment info
    const intent = await stripe.paymentIntents.retrieve(paymentInfo.id);

    if (intent.status !== "succeeded" || intent.amount !== (totalPrice * 100)) {
        return next(new ErrorHandler("Invalid Payment Info", 400));
    }
    
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    const room = await Room.findById(req.params.room);
    if (!room) {
        return next(new ErrorHandler("Room not found", 404))
    }

    const isHotelsRoom = hotel.rooms.includes(room.id);
    if (!isHotelsRoom) {
        return next(new ErrorHandler("This Room is not available in this hotel", 400))
    }

    if (dates.length < 1) {
        return next(new ErrorHandler("Please insert booking dates", 400))
    }

    const isValidDate = dates.every((date) => Date.parse(new Date().toDateString()) <= Date.parse(new Date(date).toDateString()))
    if (!isValidDate) {
        return next(new ErrorHandler("given date is before than current date"));
    }

    const hasDuplicate = dates.length !== new Set(dates).size;
    if (hasDuplicate) {
        return next(new ErrorHandler("Can't book same date more than once", 400))
    }

    if (room.notAvailable.length > 0) {
        const notAvailableCopy = room.notAvailable.map((room) => Date.parse(room));

        const isBooked = dates.some((date) => {
            return notAvailableCopy.includes(Date.parse(new Date(date)))
        });

        if (isBooked) return next(new ErrorHandler("Room already booked", 400));
    }

    let formattedDates = [];
    dates.forEach((date) => {
        room.notAvailable.push(date);
        formattedDates.push(date);
    })

    await Booking.create({
        user: req.user.id,
        hotel: hotel.id,
        room: room.id,
        dates: formattedDates,
        totalPrice,
        phone,
        paymentInfo,
        paidAt: Date.now()
    })

    await room.save();

    res.status(201).json({
        success: true
    })
})

// update booking status -- admin
exports.updateBooking = catchAsyncErrors(async (req, res, next) => {
    const status = req.body.status;

    if (status !== "Complete" && status !== "Checked") {
        return next(new ErrorHandler("Can't change booking status", 400));
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        return next(new ErrorHandler("Booking not found", 404));
    }

    if (status === 'Complete') {
        if (booking.status === "Complete") return next(new ErrorHandler("Can't change booking status", 400));

        const room = await Room.findById(booking.room);
        const bookingDatesCopy = booking.dates.map((date) => Date.parse(date));

        room.notAvailable = room.notAvailable.filter((date) => {
            return !bookingDatesCopy.includes(Date.parse(date));
        });

        await room.save();
        booking.status = status;
        await booking.save();
    }

    if (status === "Checked") {
        if (booking.status === "Checked") return next(new ErrorHandler("User already checked in", 400));
        if (booking.status === "Complete") return next(new ErrorHandler("Can't change booking status", 400));

        booking.status = status;
        await booking.save();
    }

    const bookings = await Booking.find();

    res.status(200).json({
        success: true,
        bookings
    })
})

// get own booking details
exports.getOwnBookingDetails = catchAsyncErrors(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id).populate('room').populate('hotel');

    if (!booking) {
        return next(new ErrorHandler("Booking not found", 404));
    }

    if (booking.user.toString() !== req.user.id) {
        return next(new ErrorHandler("Access denied", 403));
    }

    res.status(200).json({
        success: true,
        booking
    })
})

// get own all bookings
exports.getOwnBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find({
        user: req.user.id
    })

    if (!bookings) {
        return next(new ErrorHandler("You have no booking yet", 404));
    }

    res.status(200).json({
        success: true,
        bookings
    })
})

// get all bookings -- admin 
exports.getAllBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find();

    res.status(200).json({
        success: true,
        bookings
    })
})

// get booking details -- admin
exports.getBookingDetails = catchAsyncErrors(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id).populate('room').populate('hotel');
    if (!booking) {
        return next(new ErrorHandler("Booking not found", 404));
    }

    res.status(200).json({
        success: true,
        booking
    })
})

// send stripe api key to client
exports.sendStripeApiKey = catchAsyncErrors((req, res, next) => {
    res.status(200).json({
        message: "success",
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})

// send stripe secret key
exports.sendStripeSecretKey = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: (req.body.amount * 100),
        currency: 'bdt',
        metadata: {
            company: 'Spothotel'
        }
    });

    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    });
});


