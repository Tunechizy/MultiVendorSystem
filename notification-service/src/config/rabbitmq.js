const amqp = require('amqplib/callback_api');

// Set up RabbitMQ connection and channel
const connectRabbitMQ = (callback) => {
    amqp.connect(process.env.RABBITMQ_URI, (error, connection) => {
        if (error) {
            console.error('RabbitMQ connection error:', error);
            return;
        }
        connection.createChannel((error, channel) => {
            if (error) {
                console.error('RabbitMQ channel error:', error);
                return;
            }
            console.log('RabbitMQ connected');
            callback(channel);
        });
    });
};

module.exports = connectRabbitMQ;
