// src/providers/smsProvider.js

// Mock SmsProvider class (No Twilio here)
class SmsProvider {
    constructor() {
        // If you plan to use a real provider in the future, initialize it here
        console.log("SMS Provider Initialized - No actual SMS service used.");
    }

    // Simulate sending an SMS (mock implementation)
    async sendSms(to, message) {
        // Just print out to the console that an SMS is "sent"
        console.log(`Pretending to send SMS to ${to}: ${message}`);

        // Return a mock response object
        return {
            status: 'success',
            to,
            message,
            timestamp: new Date().toISOString(),
        };
    }
}

// Export the SmsProvider instance (singleton)
module.exports = new SmsProvider();

