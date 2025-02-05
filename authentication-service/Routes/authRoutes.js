const express = require('express');
const { registerUser, loginUser, refreshAuthToken, logoutUser } = require('../controllers/authController');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user and generate JWT and refresh token
router.post('/login', loginUser);

// Route to refresh the JWT using a valid refresh token
router.post('/refresh', refreshAuthToken);

// Route to log out a user and invalidate their refresh token (optional)
router.post('/logout', logoutUser);

module.exports = router;
