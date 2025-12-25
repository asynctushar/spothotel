const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internel Server Error.";

    // Wrong mongodb id error handling
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;

        err = new ErrorHandler(message, 400);
    }

    // Mongodb duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;

        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = "Json Web Token is invalid, please try again.";

        err = new ErrorHandler(message, 400);
    }

    // JWT expire error
    if (err.name === 'TokenExpiredError') {
        const message = "Json Web Token is expired, please try again.";

        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

module.exports = errorMiddleware;