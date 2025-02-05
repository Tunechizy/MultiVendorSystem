// src/controllers/notificationController.js
const amqp = require('amqplib');
const SmsProvider = require('../providers/smsProvider');  // If you're using SMS provider

let channel = null;
let connection = null;

async function initializeRabbitMQ() {
    try {
        // Connect to RabbitMQ
        connection = await amqp.connect('amqp://localhost');  // Replace with your RabbitMQ URL
        channel = await connection.createChannel();  // Create a channel

        // Assert a queue that the application will use
        await channel.assertQueue('order_notifications', { durable: false });
        console.log('RabbitMQ connection established and queue asserted');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
    }
}

async function handleNotification(msg) {
    try {
        // Check if the channel is initialized
        if (!channel) {
            console.error('RabbitMQ channel is not initialized.');
            return;
        }

        // Assuming you want to send a notification when the message is received
        console.log('Received message:', msg.content.toString());

        // Here, you could send an SMS or an email depending on your logic
        await SmsProvider.sendSms('1234567890', 'Order placed successfully');

        // Acknowledge the message has been processed
        channel.ack(msg);
    } catch (error) {
        console.error('Error handling notification:', error);
    }
}

// Start RabbitMQ connection and handle incoming messages
async function start() {
    await initializeRabbitMQ();  // Initialize RabbitMQ

    // Listen to the queue
    channel.consume('order_notifications', handleNotification, { noAck: false });
}

start();  // Start the process

module.exports = { handleNotification, initializeRabbitMQ };
