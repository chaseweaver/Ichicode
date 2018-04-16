const { Command } = require('klasa');
const { masterServer, reportChannel } = require('../../config.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'report',
      enabled: true,
      runIn: ['text'],
      cooldown: 60,
      bucket: 1,
      aliases: ['issue'],
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
      if (!masterServer || !reportChannel) return;
      const embed = new msg.client.methods.Embed()
        .setColor('#ff003c')
        .setAuthor(`${msg.member.user.tag} / ${msg.member.user.id}`, msg.member.user.displayAvatarURL())
        .setThumbnail(msg.member.user.displayAvatarURL())
        .addField('Guild', `${msg.guild.name} [${msg.guild.memberCount}] / ${msg.guild.id}`)
        .addField('Report', message.join(' '))
        .setTimestamp();
      this.client.guilds.find('id', masterServer).channels.find('id', reportChannel)
        .sendEmbed(embed).catch(err => msg.client.emit('log', err, 'error'));
      msg.delete();
      return msg.send('Report has been delivered!');
    } catch (err) { console.log(err); }
  }
};