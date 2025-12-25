const express = require('express');
const { getUser, updateUser, deleteUser, changePassword, chageUserRole, getOwnUser, getUsers } = require('../controllers/user.controller');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();


router.route("/me").get(isAuthenticatedUser, getOwnUser).put(isAuthenticatedUser, updateUser).delete(isAuthenticatedUser, deleteUser);
router.route("/me/password").put(isAuthenticatedUser, changePassword);
router.route('/:id').get(isAuthenticatedUser, authorizedRole("admin"), getUser).put(isAuthenticatedUser, authorizedRole("admin"), chageUserRole);
router.route('/').get(isAuthenticatedUser, authorizedRole("admin"), getUsers);


module.exports = router;