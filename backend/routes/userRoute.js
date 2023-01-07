const express = require('express');
const { createUser, loginUser, logoutUser, getUser, updateUser, deleteUser, changePassword, getUserDetails, getAllUsers, chageUserRole } = require('../controllers/userController');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();

router.route("/user/new").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUser).put(isAuthenticatedUser, updateUser).delete(isAuthenticatedUser, deleteUser);
router.route("/me/password").put(isAuthenticatedUser, changePassword);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizedRole("admin"), getUserDetails).put(isAuthenticatedUser, authorizedRole("admin"), chageUserRole);
router.route('/admin/users').get(isAuthenticatedUser, authorizedRole("admin"), getAllUsers);


module.exports = router;