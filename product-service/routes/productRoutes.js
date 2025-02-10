const express = require('express');
const multer = require('multer');
const { createProduct, updateProduct, deleteProduct, searchProductsByQuery } = require('../controllers/productController');
const Product = require('../models/product');

const router = express.Router();

// Multer setup for handling image uploads
const upload = multer();

// Get all products route
router.get('/', async (req, res, next) => {
    try {
        console.log('Fetching products...'); // Debug log
        const products = await Product.find();
        console.log('Found products:', products); // Debug log
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error); // Debug log
        next(error); // Pass error to error handling middleware
    }
});

// Routes for product CRUD operations
router.post('/', upload.single('image'), createProduct);  // Create product
router.put('/:productId', upload.single('image'), updateProduct);  // Update product
router.delete('/:productId', deleteProduct);  // Delete product
router.get('/search', searchProductsByQuery);  // Search products by query

module.exports = router;
