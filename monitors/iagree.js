const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'iagree',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  run(msg) {
    if (!msg.guild.configs.iagreeMonitor || msg.content.length !== 1 || msg.author.id === this.client.user.id) return;
    if (Math.floor(Math.random() * 31) !== 0) return;
    if (msg.content === '^') msg.channel.messages.fetch({ before: msg.id, limit: 1 }).then(m => { if (m.first().content !== '^') return msg.send('I agree!') });
  }
};