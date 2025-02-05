async function getOrder(orderId) {
    try {
        const response = await axios.get(`http://order-service:5000/api/orders/${orderId}`);
        console.log('📦 Order details:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Failed to fetch order:', error.response?.data);
        return null;
    }
}

// Example usage:
getOrder(123);
