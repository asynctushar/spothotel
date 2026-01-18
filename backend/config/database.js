const mongoose = require('mongoose');

const databaseConnect = () => {
    mongoose.set("strictQuery", false);

    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,

        // ⏱️ Timeout configurations
        serverSelectionTimeoutMS: 50000, // 50s - MongoDB server selection
        socketTimeoutMS: 50000,          // 50s - inactivity on socket
        connectTimeoutMS: 50000,         // 50s - initial connection timeout
    })
        .then((data) => {
            console.log(`Database connected to ${data.connection.host}`);
        })
        .catch((err) => {
            console.error("Database connection failed:", err.message);
        });
};

module.exports = databaseConnect;
