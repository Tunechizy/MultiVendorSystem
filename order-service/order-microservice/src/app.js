const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse request bodies
app.use(bodyParser.json());

// Routes
app.use('/api/orders', orderRoutes);

// MongoDB connection
mongoose.connect(process.env.DB_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Start the server
const port = process.env.PORT || 5004;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
