require('dotenv').config(); // Load environment variables from .env
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

// Register User
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this username or email already exists' });
        }

        // Store the password in plaintext (not recommended for production!)
        const newUser = new User({
            username,
            email,
            password, // No hashing
            role: role || 'buyer'
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Generate JWT and Refresh Token
const generateTokens = (user) => {
    const payload = { userId: user._id, role: user.role };

    const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '7d' });

    return { token, refreshToken };
};

// Login User (compare plaintext passwords)
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Search by username or email
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) return res.status(400).json({ error: 'User not found' });

        // Compare plaintext values directly
        if (password !== user.password) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const { token, refreshToken } = generateTokens(user);
        res.json({ token, refreshToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Refresh Token (unchanged)
const refreshAuthToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, config.get('jwtSecret'));
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(400).json({ error: 'Invalid refresh token' });

        const { token, refreshToken: newRefreshToken } = generateTokens(user);
        res.json({ token, refreshToken: newRefreshToken });
    } catch (error) {
        return res.status(400).json({ error: 'Invalid or expired refresh token' });
    }
};

// Logout User (stateless)
const logoutUser = async (req, res) => {
    res.status(200).json({ message: 'User logged out successfully (client must discard tokens)' });
};

// Test Auth Route
const getAuth = (req, res) => {
    res.send('Auth route is working!');
};

module.exports = { registerUser, loginUser, refreshAuthToken, logoutUser, getAuth };
