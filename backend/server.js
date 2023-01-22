const app = require('./app');
const databaseConnect = require('./config/database');
const cloudinary = require('cloudinary').v2;

const port = process.env.PORT;

// database connect
databaseConnect();

// cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(port, () => {
    console.log(`Server started at port:${port}`);
})