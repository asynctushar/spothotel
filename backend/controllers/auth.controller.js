const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const UserService = require("../services/user.service");

// register
exports.register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name) {
        return next(new ErrorHandler("Name is required", 400));
    }

    if (!email) {
        return next(new ErrorHandler("Email is required", 400));
    }

    if (!password) {
        return next(new ErrorHandler("Password is required", 400));
    }

    if (password.length < 8) {
        return next(new ErrorHandler("Password should be at least 8 characters.", 400));
    }

    const user = await UserService.createUser({ name, email, password });
    const token = user.generateAuthToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(201).cookie('token', token, options).json({
        success: true,
        user
    });
});

// login user
exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return next(new ErrorHandler("Email is required", 400));
    }

    if (!password) {
        return next(new ErrorHandler("Password is required", 400));
    }

    const user = await UserService.getUser({ email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return next(new ErrorHandler("Password incorrect"));
    }

    const token = user.generateAuthToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(201).cookie('token', token, options).json({
        success: true,
        user
    });

});

// logout user
exports.logout = catchAsyncErrors(async (_req, res, _next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
});