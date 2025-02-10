require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1);
    }
}

testConnection(); 