const sendToken = require('../utils/sendToken');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const Booking = require("../models/Booking");

// sign up
exports.createUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    
    if (password.length < 8) {
        return next(new ErrorHandler("Password should be at least 8 characters.", 400))
    }

    const user = await User.create({
        name,
        email,
        password
    });

    sendToken(user, 201, res);
})

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    if (!password) {
        return next(new ErrorHandler("Please enter password", 400));
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return next(new ErrorHandler("Password incorrect"));
    }

    sendToken(user, 200, res);
})

// logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

// get user
exports.getUser = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
})

// update user 
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(req.user.id, {
        $set: {
            name,
            email
        }
    }, { new: true , runValidators: true})

    res.status(200).json({
        success: true,
        user
    })
})

// delete user 
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    const usersBookings = await Booking.find({
        user: req.user.id
    })

    if (usersBookings.length > 0) {
        await Promise.all(usersBookings.map(async (booking) => await booking.delete()));
    }
    
    await user.delete();
    res.status(200).json({
        success: true,
        message: "User deleted succussfully"
    })
})

// change password
exports.changePassword = catchAsyncErrors(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please enter old and new password", 400))
    }

    const user = await User.findById(req.user.id).select('+password');

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
        return next(new ErrorHandler("Old password incorrect"));
    }

    if (newPassword.length < 8) {
        return next(new ErrorHandler("Password should be at least 8 characters.", 400));
    }

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res);
});

// get user details -- admin
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user
    })
})

// get all users --admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// change user role -- admin
exports.chageUserRole = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const role = req.body.role;

    if (id === req.user.id) {
        return next(new ErrorHandler("You can't change change your own role", 400));
    }

    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    if (role !== 'user' && role !== 'admin') {
        return next(new ErrorHandler("Only user and admin role available", 400));
    }

    user.role = role;

    await user.save();
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })

})

