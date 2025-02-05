const express = require('express');
const { placeOrder, getOrderDetails } = require('../controllers/orderController');
const router = express.Router();

router.post('/orders', placeOrder); // Place order
router.get('/orders/:orderId', getOrderDetails); // View order by ID

module.exports = router;
