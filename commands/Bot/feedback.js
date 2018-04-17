const { Command } = require('klasa');
const { masterServer, feedbackChannel } = require('../../config.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'feedback',
      enabled: true,
      runIn: ['text'],
      cooldown: 60,
      bucket: 1,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Sends a message to the bot developer.',
      quotedStringSupport: true,
      usage: '<message:str>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [...message]) {
    try {
      if (!masterServer || !feedbackChannel) return;
      const embed = new msg.client.methods.Embed()
        .setColor(0xFF003C)
        .setAuthor(`${msg.member.user.tag} / ${msg.member.user.id}`, msg.member.user.displayAvatarURL())
        .setThumbnail(msg.member.user.displayAvatarURL())
        .addField('Guild', `${msg.guild.name} [${msg.guild.memberCount}] / ${msg.guild.id}`)
        .addField('Feedback', message.join(' '))
        .setTimestamp();
      this.client.guilds.find('id', masterServer).channels.find('id', feedbackChannel)
        .sendEmbed(embed).catch(err => msg.client.emit('log', err, 'error'));
      return msg.send('Report has been delivered!');
    } catch (err) { console.log(err); }
  }
};