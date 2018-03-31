const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'dadjoke',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  run(msg) {
    if (!msg.guild.configs.dadjokeMonitor || msg.content.length > 30 || msg.content.length <= 5 || msg.author.id === this.client.user.id) return;
    if (Math.floor(Math.random() * 2) !== 0) return;
    if ((msg.content.toUpperCase().startsWith('IM ') || msg.content.toUpperCase().startsWith('I\'M ') || msg.content.toUpperCase().startsWith('I AM ')) && msg.author.id !== this.client.user.id) {
      if (msg.content.toUpperCase().startsWith('IM ')) return msg.send(`Hi,${msg.content.substr(2).trim()}, I'm Ichicode!`);
      if (msg.content.toUpperCase().startsWith('I\'M ')) return msg.send(`Hi,${msg.content.substr(3).trim()}, I'm Ichicode!`);
    }
  }
};