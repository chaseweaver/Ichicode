const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'antispam',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: false,
    });
  }

  run(msg) {
    if (msg.channel.type !== 'text') return;
    try {
      if (msg.guild.configs.antiSpam && msg.guild.configs.cooldown) {
        if (msg.author.id === (this.client.user.id || this.client.owner.id)) return;
        else if (msg.guild.configs.adminRole && msg.member.roles.has(msg.guild.configs.adminRole)) return;
        else if (msg.guild.configs.modRole && msg.member.roles.has(msg.guild.configs.modRole)) return;
        else if (msg.guild.configs.devRole && msg.member.roles.has(msg.guild.configs.devRole)) return;
        else if (msg.guild.configs.extRole && msg.member.roles.has(msg.guild.configs.extRole)) return;
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
      } else { return; }
    } catch (error) { console.log(error); }
  }
};