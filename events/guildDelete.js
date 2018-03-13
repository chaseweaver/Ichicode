const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'guildDelete',
      enabled: true,
      event: 'guildDelete',
      once: false,
    });
  }

  run() { console.log(`Guild Removed: ${this.guild.name}. Now at ${this.client.guilds.size}.`); }
};