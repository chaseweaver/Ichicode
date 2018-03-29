const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'messageDelete',
      enabled: true,
      event: 'messageDelete',
      once: false,
    });
  }

  run(msg) {
    try {
      if (msg.guild.configs.logMessageDelete && msg.guild.configs.messageDeleteChannel) {
        const chan = msg.guild.channels.find('id', msg.guild.configs.memberLogChannel);
        if (!chan) return;
        const avatar = msg.user.displayAvatarURL() ? msg.user.displayAvatarURL() : msg.guild.iconURL();
        const embed = new this.client.methods.Embed()
          .setColor('#00ffbb')
          .setTitle('Message Deleted')
          .setThumbnail(avatar)
          .setAuthor(`${mem.user.tag} / ${mem.user.id}`, avatar)
          .setTimestamp();
        memChan.send({ embed }).catch(err => console.log(err, 'error'));
      }
    } catch (error) { console.log(error); }
  }
};