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
    if (!msg.guild.configs.dadjokeMonitor || msg.content.length > 30 || msg.content.length <= 5 || msg.author.id === this.client.user.id) return;
    if (msg.content.toUpperCase().startsWith('IM') || msg.content.toUpperCase().startsWith('I\'M')) {
      if (msg.content.toUpperCase().startsWith('IM')) return msg.send(`Hi,${msg.content.substr(2)}, I'm Ichicode!`);
      if (msg.content.toUpperCase().startsWith('I\'M')) return msg.send(`Hi,${msg.content.substr(3)}, I'm Ichicode!`);
    }
  }
};