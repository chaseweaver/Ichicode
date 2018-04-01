const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'nah',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  run(msg) {
    if (msg.channel.type !== 'text') return;
    if (!msg.guild.configs.nahMonitor || msg.content.length !== 3 || msg.author.id === this.client.user.id) return;
    if (Math.floor(Math.random() * 31) !== 0) return;
    if (msg.content.toUpperCase() === 'NAH') return msg.send('Nah');
  }
};