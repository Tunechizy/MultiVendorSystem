class NotificationProvider {
    async sendNotification(data) {
        throw new Error('sendNotification method must be implemented');
    }
}

module.exports = NotificationProvider;
