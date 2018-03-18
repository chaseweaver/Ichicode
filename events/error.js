const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'error',
      enabled: true,
      event: 'error',
      once: false,
    });
  }

  run(err) { console.log(err); }
};