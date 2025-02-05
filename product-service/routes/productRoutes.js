const express = require('express');
const multer = require('multer');
const { createProduct, updateProduct, deleteProduct, searchProductsByQuery } = require('../controllers/productController');

const router = express.Router();

// Multer setup for handling image uploads
const upload = multer();

// Routes for product CRUD operations
router.post('/', upload.single('image'), createProduct);  // Create product
router.put('/:productId', upload.single('image'), updateProduct);  // Update product
router.delete('/:productId', deleteProduct);  // Delete product
router.get('/search', searchProductsByQuery);  // Search products by query

module.exports = router;
