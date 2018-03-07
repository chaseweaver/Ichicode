const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'softban',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: ['BAN_MEMBERS'],
      requiredConfigs: [],
      description: 'Softbans a mentioned user.',
      quotedStringSupport: true,
      usage: '<member:user> [days:int{1,7}] [reason:string]',
      usageDelim: ' ',
      extendedHelp: 'Logs a report in channel \'memLogs\' if set and with \'goodbyeMem\' enabled.',
    });
  }

  async run(msg, [user, days = 1, ...reason]) {
    if (user.id === msg.author.id) throw 'Why would you ban yourself?';
    if (user.id === this.client.user.id) throw 'Have I done something wrong?';

    const member = await msg.guild.members.fetch(user).catch(() => null);
    if (member) if (member.bannable === false) throw 'I cannot ban this user.';

    const options = { days };
    reason = reason.length > 0 ? reason.join(' ') : null;
    if (reason) options.reason = reason;

    await msg.guild.ban(user.id, options);
    await msg.guild.unban(user.id, 'Softban released.');

    if (msg.guild.settings.modLogChannel && msg.guild.settings.goodbyeMemberActive) {
      const chan = msg.guild.channels.find('id', msg.guild.settings.memLogChannel);
      const embed = new this.client.methods.Embed()
        .setColor('#ff003c')
        .setTitle('Member Softbanned')
        .setThumbnail(user.displayAvatarURL)
        .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL)
        .addField('Member', `${user.tag} / ${user.id}`)
        .addField('Days', days)
        .addField('Reason', reason)
        .setTimestamp(new Date());
      return await chan.send({ embed }).catch(console.error);
    }
  }
};