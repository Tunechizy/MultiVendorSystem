const express = require('express');
const dotenv = require('dotenv');
const notificationController = require('./controllers/notificationController');
const { onNotificationEvent } = require('./utils/eventEmitter');
const app = express();

dotenv.config();

// Handle events (e.g., order placed or status updated)
onNotificationEvent('orderPlaced', (data) => {
    notificationController.triggerNotification('orderPlaced', data);
});

// Listen to RabbitMQ events
notificationController.handleNotification();

// Start the express server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Notification service running on port ${PORT}`);
});
