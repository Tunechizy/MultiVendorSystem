const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        default: 'buyer'
    }
});

// Remove the pre-save hook (no password hashing)
// Remove the isValidPassword method since we compare plaintext directly

// Generate JWT (remains unchanged)
userSchema.methods.generateAuthToken = function () {
    const payload = { userId: this._id, role: this.role };
    return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' });
};

// Export the model
module.exports = mongoose.model('User', userSchema);
