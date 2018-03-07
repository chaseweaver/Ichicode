const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'kick',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: ['KICK_MEMBERS'],
      requiredConfigs: [],
      description: 'Kicks a mentioned user.',
      quotedStringSupport: true,
      usage: '<member:member> [reason:string]',
      usageDelim: ' ',
      extendedHelp: 'Logs a report in channel \'memLogs\' if set and with \'goodbyeMem\' enabled.',
    });
  }

  async run(msg, [member, ...reason]) {
    if (member.id === msg.author.id) throw 'Why would you kick yourself?';
    if (member.id === this.client.user.id) throw 'Have I done something wrong?';
    if (member.kickable === false) throw 'I cannot kick this user.';

    reason = reason.length > 0 ? reason.join(' ') : null;
    await member.kick(reason);

    if (msg.guild.settings.modLogChannel && msg.guild.settings.goodbyeMemberActive) {
      const chan = msg.guild.channels.find('id', msg.guild.settings.memLogChannel);
      const embed = new this.client.methods.Embed()
        .setColor('#ff003c')
        .setTitle('Member Kicked')
        .setThumbnail(member.displayAvatarURL)
        .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL)
        .addField('Member', `${member.tag} / ${member.id}`)
        .addField('Reason', reason)
        .setTimestamp(new Date());
      return await chan.send({ embed }).catch(console.error);
    }
  }
};