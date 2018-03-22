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
    if (!msg.guild.configs.whatMonitor || !msg.guild.configs.monitorCooldown || msg.content.length >= 5 || msg.author.id === this.client.user.id) return;
    if (msg.content.toUpperCase().startsWith('WHAT') || msg.content.toUpperCase().startsWith('WAT')) {
      let active = true;
      let last = '';
      msg.channel.messages.fetch({ limit: 100 })
        .then(m => {
          const arr = m.array();
          for (let i = 0; i < arr.length; i++) {
            if ((arr[i].content.toUpperCase().startsWith('WHAT') || arr[i].content.toUpperCase().startsWith('WAT')) &&
              msg.createdTimestamp <= (arr[i].createdTimestamp + msg.guild.configs.monitorCooldown * 1000))
              return last = arr[1].content.toUpperCase(), active = false;
          }
        })
        .then(function() { if (!active) return msg.send(`**${last}**`); })
        .catch(console.error);
    }
  }
};