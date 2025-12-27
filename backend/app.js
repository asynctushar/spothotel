const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
	require("dotenv").config();
}

// Routes import
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const hotelRoute = require("./routes/hotel.route");
// const roomRoute = require("./routes/room.route");
// const bookingRoute = require("./routes/booking.route");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// cors cofiguration
if (process.env.NODE_ENV !== "PRODUCTION") {
	app.use(
		require("cors")({
			origin: process.env.FRONTEND_URL,
			optionsSuccessStatus: 200,
			credentials: true,
		})
	);
}

app.use("/api/v2/auth", authRoute);
app.use("/api/v2/users", userRoute);
app.use("/api/v2/hotels", hotelRoute);
// app.use("/api/v2/rooms", roomRoute);
// app.use("/api/v2/bookings", bookingRoute);

// production build
if (process.env.NODE_ENV === "PRODUCTION") {
	app.use(express.static(path.join(__dirname + "./../frontend/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "./../frontend/build/index.html"));
	});
}

// error middileware
app.use(errorMiddleware);

module.exports = app;
