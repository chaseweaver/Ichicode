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
      usage: '<member:user> [reason:string]',
      usageDelim: ' ',
      extendedHelp: 'Logs a report in channel \'memLogs\' if set and with \'goodbyeMem\' enabled.',
    });
  }

  async run(msg, [user, ...reason]) {
    if (user.id === this.client.owner.id) throw 'I will *not* kick my master!';
    if (user.id === this.client.user.id) throw 'Have I done something wrong?';

    const member = await msg.guild.members.fetch(user).catch(() => null);
    if (member) if (member.bannable === false) throw 'I cannot ban this user.';

    const options = {};
    reason = reason.length > 0 ? reason.join(' ') : 'N/A';
    if (reason) options.reason = reason;

    await member.kick(reason);

    if (msg.guild.configs.memberLogChannel && msg.guild.configs.goodbyeMemberActive) {
      const chan = msg.guild.channels.find('id', msg.guild.configs.memberLogChannel);
      if (!chan) return;
      const embed = new this.client.methods.Embed()
        .setColor('#ff003c')
        .setTitle('Member Kicked')
        .setThumbnail(member.user.displayAvatarURL())
        .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL())
        .addField('Member', `${member.user.tag} / ${member.user.id}`)
        .addField('Reason', reason)
        .setTimestamp(new Date());
      return await chan.send({ embed }).catch(console.error);
    }
  }
};