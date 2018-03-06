const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'antiSpam',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: false,
    });
  }

  run(msg) {
    try {
      if (msg.guild.configs.antiSpam && msg.guild.configs.cooldown) {
        if (msg.member.roles.find('name', msg.guild.configs.modRole) ||
          msg.member.roles.find('name', msg.guild.configs.adminRole) ||
          (msg.member.id === msg.client.owner.id)) return;
        if (msg.channel.type === 'dm') return;
        const cooldown = msg.guild.configs.cooldown;
        const msgTS = msg.createdTimestamp;
        const data = [];
        msg.channel.messages.fetch({ limit: 15 })
          .then(m => {
            const arr = m.array();
            for (let i = 0; i < arr.length; i++) {
              if (msg.author.id === arr[i].author.id) {data.push(arr[i].createdTimestamp);}
              if (data.length >= 2) return;
            }
          })
          .then(function() {
            const oldTS = data[1];
            if (msgTS <= oldTS + (cooldown * 1000)) msg.delete();
          })
          .catch(console.error);
      }
    } catch (error) { console.log(error); }
  }
};