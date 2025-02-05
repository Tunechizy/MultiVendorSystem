const nodemailer = require('nodemailer');
const NotificationProvider = require('../interfaces/notificationProviderInterface');

// Create a class for email notifications
class EmailProvider extends NotificationProvider {
    constructor() {
        super();
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    // Send email notification
    async sendNotification(data) {
        const { to, subject, text } = data;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent: ' + subject);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

module.exports = EmailProvider;
