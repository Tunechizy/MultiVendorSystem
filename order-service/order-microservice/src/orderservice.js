const amqp = require('amqplib/callback_api');
const dotenv = require('dotenv');
dotenv.config();

// Connect to RabbitMQ and send order event
const publishOrderPlacedEvent = (orderData) => {
    amqp.connect(process.env.RABBITMQ_URI, (error, connection) => {
        if (error) {
            console.error('Error connecting to RabbitMQ:', error);
            return;
        }
        connection.createChannel((error, channel) => {
            if (error) {
                console.error('Error creating channel:', error);
                return;
            }

            const queue = 'order_placed_queue';
            channel.assertQueue(queue, { durable: false });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(orderData)));

            console.log('Published order placed event:', orderData);
        });
    });
};

module.exports = { publishOrderPlacedEvent };
