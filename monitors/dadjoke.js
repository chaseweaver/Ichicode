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
    if (!msg.guild.configs.dadjokeMonitor || !msg.guild.configs.monitorCooldown || msg.content.length > 30 || 
      msg.content.length <= 5 || msg.author.id === this.client.user.id) return;
    if (msg.content.toUpperCase().startsWith('IM') || msg.content.toUpperCase().startsWith('I\'M')) {
      let active = true;
      msg.channel.messages.fetch({ limit: 100 })
        .then(m => {
          const arr = m.array();
          for (let i = 0; i < arr.length; i++) {
            if ((arr[i].content.toUpperCase().startsWith('IM') || arr[i].content.toUpperCase().startsWith('I\'M')) &&
              msg.createdTimestamp <= (arr[i].createdTimestamp + msg.guild.configs.monitorCooldown * 1000))
              return active = false;
          }
        })
        .then(function() {
          if (!active) {
            if (msg.content.toUpperCase().startsWith('IM')) return msg.send(`Hi,${msg.content.substr(2)}, I'm Ichicode!`);
            if (msg.content.toUpperCase().startsWith('I\'M')) return msg.send(`Hi,${msg.content.substr(3)}, I'm Ichicode!`);
          }
        })
        .catch(console.error);
    }
  }
};