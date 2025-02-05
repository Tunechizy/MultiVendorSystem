const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Emit events
const emitNotificationEvent = (event, data) => {
    eventEmitter.emit(event, data);
};

// Listen for events
const onNotificationEvent = (event, listener) => {
    eventEmitter.on(event, listener);
};

module.exports = { emitNotificationEvent, onNotificationEvent };
