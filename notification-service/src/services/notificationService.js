const EmailProvider = require('../providers/emailProvider');
const smsProvider = require('../providers/smsProvider'); // Future SMS provider
const NotificationProvider = require('../interfaces/notificationProviderInterface');

// This function decides which provider to use (email, SMS, etc.)
const sendNotification = async (data) => {
    let notificationProvider = new EmailProvider(); // Default to Email Provider

    if (data.type === 'sms') {
        notificationProvider = new smsProvider(); // Placeholder for future SMS provider
    }

    await notificationProvider.sendNotification(data);
};

module.exports = { sendNotification };
