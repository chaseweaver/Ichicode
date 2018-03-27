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
    if (!msg.content || !msg.guild.configs.whatMonitor || msg.content.length >= 5 || msg.author.id === this.client.user.id) return;
    if (Math.floor(Math.random() * 6) !== 0) return;
    else if ((msg.content.toUpperCase().startsWith('WHAT') || msg.content.toUpperCase().startsWith('WAT') || msg.content.toUpperCase().startsWith('WUT')) && msg.author.id !== this.client.user.id) {
      msg.channel.messages.fetch({ before: msg.id, limit: 1 }).then(m => { return msg.send(`**${m.first().content.toUpperCase()}**`) });
    }
  }
};