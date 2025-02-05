const axios = require('axios');

async function verifyUser(token) {
    try {
        const response = await axios.get('http://authentication-service:5000/api/verify', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ User verified:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ User verification failed:', error.response?.data);
        return null;
    }
}

// Example usage:
verifyUser('your_jwt_token');
