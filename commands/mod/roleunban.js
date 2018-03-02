/* RoleUnbans a mentioned user. */

exports.run = async (client, msg, [mem, reason]) => {
  reason = 'N/A';
  if (msg.guild.settings.roleBan) {
    const role = msg.guild.roles.find('id', msg.guild.settings.roleBan);
    if (mem.roles.find(role)) return msg.send(`${mem.author.tag} is already RoleUnbanned!`);
    await mem.removeRole(role, reason).catch(error => msg.reply(`I couldn't RoleUnban because of : ${error}`));
    if (msg.guild.settings.modLogs) {
      const chan = msg.guild.channels.find('id', msg.guild.settings.modLogs);
      const embed = new client.methods.Embed()
        .setColor('#ff003c')
        .setTitle('Member RoleUnbanned')
        .setThumbnail(mem.user.displayAvatarURL)
        .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL)
        .addField('Member', `${mem.user.tag} / ${mem.user.id}`)
        .addField('Reason', reason)
        .setTimestamp(new Date());
      return await chan.send({ embed }).catch(console.error);
    }
  }
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 2,
  botPerms: ['MANAGE_ROLES'],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'ban',
  description: 'Removes \'roleban\' role from a user.',
  usage: '<member:member> [reason:str]',
  usageDelim: '',
  extendedHelp: '',
};