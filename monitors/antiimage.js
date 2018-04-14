const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'antiimage',
      enabled: true,
      ignoreBots: true,
      ignoreSelf: true,
      ignoreOthers: false,
      ignoreEdits: false,
    });
  }

  async run(msg) {
    if (msg.channel.type !== 'text' || msg.attachments.size === 0 || !msg.guild.configs.muteRole) return;
    // else if (msg.author.id === (this.client.user.id || this.client.owner.id)) return;
    // else if (msg.guild.configs.adminRole && msg.member.roles.has(msg.guild.configs.adminRole)) return;
    // else if (msg.guild.configs.modRole && msg.member.roles.has(msg.guild.configs.modRole)) return;

    try {
      if (msg.guild.configs.antiimageMonitor && msg.guild.configs.imageCooldown) {

        const cooldown = msg.guild.configs.imageCooldown;
        const data = [];
        let active = false;

        msg.channel.messages.fetch({ limit: 25 })
          .then(m => {
            const arr = m.array();
            for (let i = 0; i < arr.length; i++) {
              if (msg.author.id === arr[i].author.id && msg.attachments.size !== 0)
                data.push(arr[i].createdTimestamp);
              if (data.length >= 3) return;
            }
          })
          .then(function() {
            if (data.length <= 2) return;
            if (msg.createdTimestamp <= data[1] + (cooldown * 1000)) {
              msg.guild.members.find('id', msg.author.id).roles.add(msg.guild.configs.muteRole);
              msg.guild.members.find('id', msg.author.id).user.send('You have been muted due to attachment spam. Please wait 10 minutes and cool down.');
              active = true;
            }
          })
          .then(() => {
            if (active) {
              return this.client.schedule.create('mute', Date.now() + (1000 * 5), {
                data: {
                  member: msg.guild.members.find('id', msg.author.id),
                  role: msg.guild.configs.muteRole
                },
                catchUp: true
              });
            }
          })
          .catch(console.error);
      } else { return; }
    } catch (error) { console.log(error); }
  }
};