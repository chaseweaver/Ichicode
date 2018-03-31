const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'messageUpdate',
      enabled: true,
      event: 'messageUpdate',
      once: false,
    });
  }

  run(oldMsg, newMsg) {
    try {
      if (oldMsg.guild.configs.logMessageEdit && oldMsg.guild.configs.messageEditChannel) {
        const chan = newMsg.guild.channels.find('id', newMsg.guild.configs.messageEditChannel);
        if (!chan) return;
        const avatar = newMsg.author.displayAvatarURL();
        const embed = new this.client.methods.Embed()
          .setColor('#f6ff00')
          .setTitle('Message Edited')
          .setThumbnail(avatar)
          .setAuthor(`${newMsg.author.tag} / ${newMsg.author.id}`, avatar)
          .addField('Old Content', oldMsg.content)
          .addField('New Content', newMsg.content)
          .setTimestamp();
        chan.send({ embed }).catch(err => console.log(err, 'error'));
      }
    } catch (error) { console.log(error); }
  }
};