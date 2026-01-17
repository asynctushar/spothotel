const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [40, "Name cannot exceed 40 characters"],
        minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
        type: String,
        required: [true, "Email address is required"],
        trim: true,
        unique: true,
        index: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
        maxlength: [50, "Email address cannot exceed 50 characters"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }],
    role: {
        type: String,
        default: 'user',
        enum: ["user", "admin"]
    }
}, { timestamps: true });

// remove password before sending off
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
};

// hash password before save 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 8);
});

// compare password while login 
userSchema.methods.comparePassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
};

// generate auth token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

const User = mongoose.model("User", userSchema);

module.exports = User;