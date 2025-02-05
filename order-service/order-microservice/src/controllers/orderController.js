const Order = require('../models/orderModel');
const { generateOrderId } = require('../utils/orderUtils');

const placeOrder = async (req, res) => {
    try {
        const { user_id, seller_id, shipping_address, order_items, total_price } = req.body;

        // Generate a unique order ID
        const orderId = generateOrderId();

        // Create a new order
        const newOrder = new Order({
            order_id: orderId,
            user_id,
            seller_id,
            shipping_address,
            order_items,
            total_price,
        });

        // Save order to database
        const savedOrder = await newOrder.save();

        // Return success response
        res.status(201).json({
            message: 'Order placed successfully',
            order: savedOrder,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Fetch order from database
        const order = await Order.findOne({ order_id: orderId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Return order details
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    placeOrder,
    getOrderDetails,
};
