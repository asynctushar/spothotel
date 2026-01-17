const User = require("../models/User");

exports.createUser = async ({ name, email, password }) => {
    const user = await User.create({
        name,
        email,
        password
    });
    return user;
};

exports.getUser = async ({ email, id }) => {
    let user = null;

    if (id) {
        user = await User.findById(id);
    } else if (email) {
        user = await User.findOne({
            email,
        });
    }

    return user;
};

exports.updateUser = async (id, newData) => {

    const user = await User.findByIdAndUpdate(id, {
        $set: {
            ...newData
        }
    }, { new: true, runValidators: true });

    return user;
};

exports.updatePassword = async (user, newPassword) => {
    user.password = newPassword;
    await user.save();

    return user;
};

exports.deleteUser = async (id) => {
    await User.findByIdAndDelete(id);

    return;
};

exports.getUsers = async () => {
    const users = await User.find();

    return users;
};
