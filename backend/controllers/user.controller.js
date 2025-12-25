const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const UserService = require("../services/user.service");
const BookingService = require("../services/booking.service");
const ErrorHandler = require('../utils/errorHandler');



// get user
exports.getOwnUser = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

// update user 
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email } = req.body;
    const user = await UserService.updateUser(req.user.id, { name, email });

    res.status(200).json({
        success: true,
        user
    });
});

// delete user 
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    await BookingService.deleteBookings({ user: req.user.id });
    await UserService.deleteUser(req.user.id);

    res.status(200).json({
        success: true,
        message: "User deleted succussfully"
    });
});

// change password
exports.changePassword = catchAsyncErrors(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please enter old and new password", 400));
    }


    const isMatch = await req.user.comparePassword(oldPassword);
    if (!isMatch) {
        return next(new ErrorHandler("Old password incorrect"));
    }

    if (newPassword.length < 8) {
        return next(new ErrorHandler("Password should be at least 8 characters.", 400));
    }

    const user = await UserService.updatePassword(req.user, newPassword);
    const token = user.generateAuthToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(200).cookie('token', token, options).json({
        success: true,
        user
    });
});

// get user details -- admin
exports.getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await UserService.getUser({ id: req.params.id });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user
    });
});

// get all users --admin
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await UserService.getUsers();

    res.status(200).json({
        success: true,
        users
    });
});

// change user role -- admin
exports.chageUserRole = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const role = req.body.role;

    if (id === req.user.id) {
        return next(new ErrorHandler("You can't change change your own role", 400));
    }

    const user = await UserService.getUser({ id });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    if (role !== 'user' && role !== 'admin') {
        return next(new ErrorHandler("Only user and admin role available", 400));
    }

    const newUser = await UserService.updateUser(id, { role });

    res.status(200).json({
        success: true,
        user: newUser
    });

})

