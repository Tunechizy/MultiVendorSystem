const Product = require('../models/product');
const mongoose = require('mongoose');

const seedProducts = async () => {
    try {
        // Force clear all existing products
        console.log('Clearing existing products...');
        await Product.deleteMany({});

        // Add realistic test products
        const testProducts = [
            {
                title: "iPhone 14 Pro Max",
                description: "Latest Apple iPhone with A16 Bionic chip, 6.7-inch Super Retina XDR display, and pro-level camera system",
                price: 1099.99,
                imageUrl: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Electronics"
            },
            {
                title: "Nike Air Max 270",
                description: "Comfortable athletic shoes with Air Max cushioning, perfect for both sport and casual wear",
                price: 149.99,
                imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Footwear"
            },
            {
                title: "Samsung 55\" 4K Smart TV",
                description: "Crystal clear 4K UHD resolution, smart features with built-in streaming apps, and stunning picture quality",
                price: 699.99,
                imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Electronics"
            },
            {
                title: "Leather Messenger Bag",
                description: "Handcrafted genuine leather bag with multiple compartments, perfect for work or travel",
                price: 89.99,
                imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Accessories"
            },
            {
                title: "Coffee Maker Deluxe",
                description: "Programmable coffee maker with 12-cup capacity, built-in grinder, and thermal carafe",
                price: 129.99,
                imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Home & Kitchen"
            },
            {
                title: "Gaming Laptop",
                description: "15.6\" gaming laptop with RTX 3070, 16GB RAM, 1TB SSD, and high refresh rate display",
                price: 1499.99,
                imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Electronics"
            },
            {
                title: "Wireless Earbuds",
                description: "True wireless earbuds with active noise cancellation, 24-hour battery life with case",
                price: 159.99,
                imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Electronics"
            },
            {
                title: "Yoga Mat Premium",
                description: "Extra thick eco-friendly yoga mat with alignment lines and carrying strap",
                price: 45.99,
                imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Sports & Fitness"
            },
            {
                title: "Smart Watch Series 5",
                description: "Advanced fitness tracking, heart rate monitoring, GPS, and smartphone notifications",
                price: 299.99,
                imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Electronics"
            },
            {
                title: "Designer Sunglasses",
                description: "UV protection sunglasses with polarized lenses and premium frame",
                price: 179.99,
                imageUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Fashion"
            },
            {
                title: "Robot Vacuum Cleaner",
                description: "Smart robot vacuum with mapping technology, WiFi connectivity, and automatic charging",
                price: 349.99,
                imageUrl: "https://images.unsplash.com/photo-1630826006929-3af98b4ace8f?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Home & Kitchen"
            },
            {
                title: "Professional DSLR Camera",
                description: "24.1MP digital camera with 4K video recording, WiFi, and multiple lens compatibility",
                price: 899.99,
                imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
                sellerId: new mongoose.Types.ObjectId(),
                category: "Electronics"
            }
        ];

        const result = await Product.insertMany(testProducts);
        console.log(`Successfully seeded ${result.length} products`);
    } catch (error) {
        console.error('Error seeding products:', error);
    }
};

module.exports = seedProducts; 