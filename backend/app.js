const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "backend/config/config.env" })
}

// Routes import
const userRoute = require('./routes/userRoute');
const hotelRoute = require('./routes/hotelRoute');
const roomRoute = require('./routes/roomRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// cors cofiguration
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        origin: process.env.FRONTEND_URL,
        optionsSuccessStatus: 200
    })
}

app.use('/api/v1', userRoute);
app.use('/api/v1', hotelRoute);
app.use('/api/v1', roomRoute);

// error middileware
app.use(errorMiddleware)






module.exports = app;