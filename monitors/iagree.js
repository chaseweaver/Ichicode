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
    if (!msg.guild.configs.iagreeMonitor || msg.content.length > 30 || msg.content.length !== 1 || msg.author.id === this.client.user.id) return;
    if (msg.content === '^' && msg.channel.messages.fetch({ before: msg.id, limit: 1 }).then(m => { if (m.first().content !== '^' && m.author.id !== this.client.user.id) return msg.send('I agree!') }));
  }
};