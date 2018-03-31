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
        const chan = msg.guild.channels.find('id', msg.guild.configs.messageDeleteChannel);
        if (!chan) return;
        const avatar = msg.author.displayAvatarURL();
        const embed = new this.client.methods.Embed()
          .setColor('#ff003c')
          .setThumbnail(avatar)
          .setAuthor(`${msg.author.tag} / ${msg.author.id}`, avatar)
          .addField('Deleted Content', msg.content)
          .setTimestamp();
        chan.send({ embed }).catch(err => console.log(err, 'error'));
      }
    } catch (error) { console.log(error); }
  }
};