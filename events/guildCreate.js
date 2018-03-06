const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'guildCreate',
      enabled: true,
      event: 'guildCreate',
      once: false,
    });
  }

  run() {
    if(!this.guild.available) return;
    console.log(`Guild Joined: ${this.guild.name}. Now at ${this.client.guilds.size}.`);
  }
};