/* Kicks a mentioned user. */

exports.run = async (client, msg, [mem, reason]) => {
  reason = 'N/A';
  await mem.kick(reason).catch(error => msg.reply(`I couldn't kick because of : ${error}`));
  if (msg.guild.settings.memLogs && msg.guild.settings.goodbyeMem) {
    const chan = msg.guild.channels.find('id', msg.guild.settings.memLogs);
    const embed = new client.methods.Embed()
      .setColor('#ff003c')
      .setTitle('Member Kicked')
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
  botPerms: ['KICK_MEMBERS'],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'kick',
  description: 'Kicks a user.',
  usage: '<member:member> [reason:str]',
  usageDelim: ' ',
  extendedHelp: '',
};