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
     if (msg.content.toUpperCase().includes('WAKE ME UP INSIDE')) {
      const data = [];
      msg.channel.messages.fetch({ limit: 50 })
        .then(m => {
          const arr = m.array();
          for (let i = 0; i < arr.length; i++) { 
            if ((arr[i].content.includes(`**Can't wake up!**`)) && arr[i].author.id === this.client.user.id)
              data.push(arr[i].createdTimestamp);
          }
        })
        .then(function() { 
          if (msg.createdTimestamp >= (data[0] + msg.guild.configs.monitorCooldown * 1000))
            return msg.send(`**Can't wake up!**`); 
        })
        .catch(console.error);
    } else if (msg.content.toUpperCase().startsWith('WAKE') && msg.content.toUpperCase().endsWith('UP')) {
      const data = [];
      msg.channel.messages.fetch({ limit: 50 })
        .then(m => {
          const arr = m.array();
          for (let i = 0; i < arr.length; i++) { 
            if ((arr[i].content.startsWith('**Wake') && arr[i].endsWith('inside!**')) && arr[i].author.id === this.client.user.id) 
              data.push(arr[i].createdTimestamp);
          }
        })
        .then(function() { 
          if (msg.createdTimestamp >= (data[0] + msg.guild.configs.monitorCooldown * 1000))
            return msg.send(`*Wakes${msg.content.substring(4, msg.content.length - 2)}up inside!*`); 
        })
        .catch(console.error);
    } else return;
  }
};

