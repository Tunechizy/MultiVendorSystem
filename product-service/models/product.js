const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,  // Image URL after upload to S3 or any other service
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you store user IDs as MongoDB ObjectIDs
        ref: 'User',  // Reference to the User model
        required: true
    },
    category: {
        type: String,
        required: false  // Optional field for categorizing products
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
