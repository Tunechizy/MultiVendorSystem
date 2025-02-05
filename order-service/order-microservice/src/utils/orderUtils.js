const { v4: uuidv4 } = require('uuid');

// Utility function to generate a unique order ID
const generateOrderId = () => {
    return uuidv4(); // Generates a unique ID using UUID
};

module.exports = { generateOrderId };
