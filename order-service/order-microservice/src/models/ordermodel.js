const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    unit_price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    shipping_address: {
        street: String,
        city: String,
        country: String,
        zip: String,
    },
    order_items: [orderItemSchema],
    total_price: { type: Number, required: true },
    order_status: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered, Canceled
    payment_status: { type: String, default: 'Pending' }, // Pending, Completed, Failed
    order_date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
