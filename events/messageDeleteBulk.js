const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'messageDeleteBulk',
      enabled: true,
      event: 'messageDeleteBulk',
      once: false,
    });
  }

  run(msg) { 
    return;
  }
};