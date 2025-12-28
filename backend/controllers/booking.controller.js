const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const HotelService = require("../services/hotel.service");
const BookingService = require("../services/booking.service");
const RoomService = require("../services/room.service");
const PaymentService = require("../services/payment.service");

// new booking
exports.createBooking = catchAsyncErrors(async (req, res, next) => {
    const { paymentInfo, dates, totalPrice, phone } = req.body;

    if (!paymentInfo || !paymentInfo.id) {
        return next(new ErrorHandler("PaymentInfo is required", 400));
    }
    if (!dates || !Array.isArray(dates) || dates.length < 1) {
        return next(new ErrorHandler("Dates are required", 400));
    }
    if (!totalPrice) {
        return next(new ErrorHandler("TotalPrice is required", 400));
    }
    if (!phone) {
        return next(new ErrorHandler("Phone number is required", 400));
    }

    // validation of payment info
    const intent = await PaymentService.retrivePaymentIndent(paymentInfo);
    if (intent.status !== "succeeded" || intent.amount !== (totalPrice * 100)) {
        return next(new ErrorHandler("Invalid Payment Info", 400));
    }

    const hotel = await HotelService.getHotel({ id: req.params.id });
    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    const room = await RoomService.getRoom({ id: req.params.room });
    if (!room) {
        return next(new ErrorHandler("Room not found", 404));
    }

    const isHotelsRoom = hotel.rooms.includes(room.id);
    if (!isHotelsRoom) {
        return next(new ErrorHandler("This Room is not available in this hotel", 400));
    }

    const isValidDate = dates.every((date) => Date.parse(new Date().toDateString()) <= Date.parse(new Date(date).toDateString()));
    if (!isValidDate) {
        return next(new ErrorHandler("given date is before than current date"));
    }

    const hasDuplicate = dates.length !== new Set(dates).size;
    if (hasDuplicate) {
        return next(new ErrorHandler("Can't book same date more than once", 400));
    }

    if (room.notAvailable.length > 0) {
        const notAvailableCopy = room.notAvailable.map((room) => Date.parse(room));
        const isBooked = dates.some((date) => {
            return notAvailableCopy.includes(Date.parse(new Date(date)));
        });

        if (isBooked) return next(new ErrorHandler("Room already booked", 400));
    }

    // create booking
    const booking = await BookingService.createBooking({
        user: req.user.id,
        hotel: hotel.id,
        room: room.id,
        dates,
        totalPrice,
        phone,
        paymentInfo,
        paidAt: Date.now()
    });

    // update room availabilities
    const notAvailableDates = [...room.notAvailable.toObject(), ...dates];
    await RoomService.updateRoom(room.id, { notAvailable: notAvailableDates });

    res.status(201).json({
        success: true,
        booking
    });
});

// update booking status -- admin
exports.updateBooking = catchAsyncErrors(async (req, res, next) => {
    const status = req.body.status;
    if (!["Processing", "Complete", "Checked"].includes(status)) {
        return next(new ErrorHandler("Please select correct status", 400));
    }

    if (status === "Processing") {
        return next(new ErrorHandler("Can't change booking status", 400));
    }

    let booking = await BookingService.getBooking({ id: req.params.id });
    if (!booking) {
        return next(new ErrorHandler("Booking not found", 404));
    }

    if (status === 'Complete') {
        if (booking.status === "Complete") return next(new ErrorHandler("Can't change booking status", 400));

        const room = await RoomService.getRoom({ id: booking.room });
        const bookingDatesCopy = booking.dates.map((date) => Date.parse(date));
        const notAvailableDates = room.notAvailable.filter((date) => {
            return !bookingDatesCopy.includes(Date.parse(date));
        });

        await RoomService.updateRoom(room.id, { notAvailable: notAvailableDates });
        booking = await BookingService.updateBooking(booking.id, { status });
    }

    if (status === "Checked") {
        if (booking.status === "Checked") return next(new ErrorHandler("User already checked in", 400));
        if (booking.status === "Complete") return next(new ErrorHandler("Can't change booking status", 400));

        booking = await BookingService.updateBooking(booking.id, { status });
    }

    res.status(200).json({
        success: true,
        message: "Booking updated successfully.",
        booking
    });
});

// get own booking details
exports.getOwnBookingDetails = catchAsyncErrors(async (req, res, next) => {
    const booking = await BookingService.getBooking({ id: req.params.id }, ["room", "hotel"]);
    if (!booking) {
        return next(new ErrorHandler("Booking not found", 404));
    }

    if (booking.user.toString() !== req.user.id) {
        return next(new ErrorHandler("Access denied", 403));
    }

    res.status(200).json({
        success: true,
        booking
    });
});

// get own all bookings
exports.getOwnBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await BookingService.getBookings({
        user: req.user.id
    });
    if (!bookings) {
        return next(new ErrorHandler("You have no booking yet", 404));
    }

    res.status(200).json({
        success: true,
        bookings
    });
});

// get all bookings -- admin 
exports.getAllBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await BookingService.getBookings();

    res.status(200).json({
        success: true,
        bookings
    });
});

// get booking details -- admin
exports.getBookingDetails = catchAsyncErrors(async (req, res, next) => {
    const booking = await BookingService.getBooking({ id: req.params.id }, ["room", "hotel"]);
    if (!booking) {
        return next(new ErrorHandler("Booking not found", 404));
    }

    res.status(200).json({
        success: true,
        booking
    });
});

// send stripe api key to client
exports.sendStripePublicApiKey = catchAsyncErrors((req, res, next) => {
    res.status(200).json({
        message: "success",
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});

// send stripe secret key
exports.createPayment = catchAsyncErrors(async (req, res, next) => {
    const { amount } = req.body;
    if (!amount) {
        return next(new ErrorHandler("Amount is required", 400));
    }

    const myPayment = await PaymentService.createPaymentIntent({
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


