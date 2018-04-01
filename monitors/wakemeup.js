const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'wakemeup',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  run(msg) {
    if (msg.channel.type !== 'text') return;
    if (!msg.content || !msg.guild.configs.wakemeupMonitor || msg.content.length > 50 ||  msg.content.length <= 5 || msg.author.id === this.client.user.id) return;
    if (msg.content.toUpperCase() === 'WAKE ME UP INSIDE') return msg.send(`*Can't wake up!*`);
    if (msg.content.toUpperCase().startsWith('WAKE') && msg.content.toUpperCase().endsWith('UP') && msg.content.length !== 7) return msg.send(`*Wakes${msg.content.substring(4, msg.content.length - 2)}up inside!*`);
  }
};