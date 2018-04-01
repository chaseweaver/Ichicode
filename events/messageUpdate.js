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
    if (oldMsg.channel.type !== 'text') return;
    try {
      if (oldMsg.guild.configs.logMessageEdit && oldMsg.guild.configs.messageEditChannel) {
        const chan = oldMsg.guild.channels.find('id', oldMsg.guild.configs.messageEditChannel);
        if (!chan) return;
        const avatar = oldMsg.author.displayAvatarURL();
        const embed = new this.client.methods.Embed()
          .setColor('#f6ff00')
          .setTitle('Message Edited')
          .setThumbnail(avatar)
          .setAuthor(`${oldMsg.author.tag} / ${oldMsg.author.id}`, avatar)
          .addField('Channel', oldMsg.channel)
          .addField('Old Content', oldMsg.content)
          .addField('New Content', newMsg.content)
          .setTimestamp();
        return chan.send({ embed });
      }
    } catch (error) { console.log(error); }
  }
};