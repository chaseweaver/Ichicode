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
      const data = [];
      msg.channel.messages.fetch({ limit: 50 })
        .then(m => {
          const arr = m.array();
          for (let i = 0; i < arr.length; i++) {
            if ((arr[i].content.startsWith('**') && arr[i].content.endWith('**') && arr[i].author.id === this.client.user.id)) {
              data.push(arr[i].createdTimestamp);
              data.push(arr[i].content.toUpperCase());
            }
          }
        })
        .then(function() {
          if (msg.createdTimestamp >= (data[0] + msg.guild.configs.monitorCooldown * 1000))
            return msg.send(`**${data[1]}**`); 
        })
        .catch(console.error);
    } else return;
  }
};