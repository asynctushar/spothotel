const express = require('express');
const { createUser, loginUser, logoutUser, getUser, updateUser, deleteUser, changePassword } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route("/user/new").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUser).put(isAuthenticatedUser, updateUser).delete(isAuthenticatedUser, deleteUser);
router.route("/me/password").put(isAuthenticatedUser, changePassword);


module.exports = router;