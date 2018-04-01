const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'what',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  run(msg) {
    if (msg.channel.type !== 'text') return;
    if (!msg.content || !msg.guild.configs.whatMonitor || msg.content.length >= 5 || msg.author.id === this.client.user.id) return;
    if (Math.floor(Math.random() * 31) !== 0) return;
    else if ((msg.content.toUpperCase() === 'WHAT' || msg.content.toUpperCase() === 'WAT' || msg.content.toUpperCase() === 'WUT') && msg.author.id !== this.client.user.id) {
      msg.channel.messages.fetch({ before: msg.id, limit: 1 }).then(m => { return msg.send(`**${m.first().content.toUpperCase()}**`) });
    }
  }
};