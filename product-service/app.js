const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();

const app = express();

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        // Import and seed after successful connection
        const seedProducts = require('./utils/seedData');
        try {
            await seedProducts();
            console.log('Database seeded successfully');
        } catch (error) {
            console.error('Error seeding database:', error);
        }
    })
    .catch((err) => console.log('Failed to connect to MongoDB:', err));

// Import routes after DB connection
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
});
