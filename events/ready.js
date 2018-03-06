const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'ready',
      enabled: true,
      event: 'ready',
      once: false,
    });
  }

  run() { this.client.user.setActivity('+help', { type: 'LISTENING' }); }
};