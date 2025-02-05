const Product = require('../models/Product');

// Create product
const createProduct = async (req, res) => {
    const { title, description, price, sellerId, category } = req.body;
    const image = req.file;  // Assuming image is uploaded via form field 'image'

    try {
        // Upload the image and get the URL (Assuming image upload logic is implemented elsewhere)
        const imageUrl = await uploadImage(image.buffer, image.originalname);

        // Create new product in MongoDB
        const newProduct = new Product({
            title,
            description,
            price,
            sellerId,
            category,
            imageUrl,
        });

        // Save product to database
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { title, description, price, category } = req.body;
    const sellerId = req.user.id;  // Assuming sellerId is extracted from JWT

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.sellerId.toString() !== sellerId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Update product fields
        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    const sellerId = req.user.id;  // Assuming sellerId is extracted from JWT

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.sellerId.toString() !== sellerId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await product.remove();
        res.status(204).json();  // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search products by query (using MongoDB)
const searchProductsByQuery = async (req, res) => {
    const { query } = req.query;  // Assuming query is passed as a URL parameter

    try {
        const products = await Product.find({
            $text: { $search: query },  // MongoDB full-text search
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createProduct, updateProduct, deleteProduct, searchProductsByQuery };
