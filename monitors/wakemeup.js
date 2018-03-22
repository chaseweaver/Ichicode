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
    if (!msg.guild.configs.wakemeupMonitor || !msg.guild.configs.monitorCooldown || msg.content.length > 50 || 
      msg.content.length <= 5 || msg.author.id === this.client.user.id) return;
    if (msg.content.toUpperCase().includes('WAKE ME UP INSIDE')) return msg.send(`*Wake me up inside!*`);
    if (msg.content.toUpperCase().startsWith('WAKE') && msg.content.toUpperCase().endsWith('UP')) {
      let active = true;
      msg.channel.messages.fetch({ limit: 100 })
        .then(m => {
          const arr = m.array();
          for (let i = 0; i < arr.length; i++) {
            if ((arr[i].content.toUpperCase().startsWith('WAKE') || arr[i].content.toUpperCase().endsWith('UP')) &&
              msg.createdTimestamp >= (arr[i].createdTimestamp + msg.guild.configs.monitorCooldown * 1000))
              return active = false;
          }
        })
        .then(function() { if (!active) return msg.send(`*Wakes${msg.content.substring(4, msg.content.length - 2)}up inside!*`); })
        .catch(console.error);
    }
  }
};