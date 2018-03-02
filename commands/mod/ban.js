/* Bans a mentioned user. */

exports.run = async (client, msg, [mem, reason]) => {
  if (!reason) reason = 'N/A';
  await mem.ban(reason).catch(error => msg.reply(`Sorry ${msg.author} I couldn't ban because of : ${error}`));
  if (msg.guild.settings.memLogs && msg.guild.settings.goodbyeMem) {
    const chan = msg.guild.channels.find('id', msg.guild.settings.memLogs);
    const embed = new client.methods.Embed()
      .setColor('#ff003c')
      .setTitle('Member Banned')
      .setThumbnail(mem.user.displayAvatarURL)
      .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL)
      .addField('Member', `${mem.user.tag} / ${mem.user.id}`)
      .addField('Reason', reason)
      .setTimestamp(new Date());
    return await chan.send({ embed }).catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 2,
  botPerms: ['BAN_MEMBERS'],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'ban',
  description: 'Bans a user.',
  usage: '<member:member> [reason:str]',
  usageDelim: ' ',
  extendedHelp: '',
};