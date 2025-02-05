require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');


// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware for security
app.use(helmet()); // Helps secure HTTP headers
app.use(cors());   // Allows cross-origin requests (adjust as needed for your frontend)

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route to test if the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Authentication Microservice');
});

// Import and use authentication routes
const authRoutes = require('./Routes/authRoutes');
app.use('/api/auth', authRoutes);

// Connect to MongoDB (ensure your Mongo URI is in .env)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));




// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log error details (can be replaced with more sophisticated logging)
    res.status(500).json({ error: 'Something went wrong, please try again later' });
});

// Port setup and server start
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Authentication service running on port ${PORT}`);
});

