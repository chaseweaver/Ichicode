/* Rolebans a mentioned user. */

exports.run = async (client, msg, [mem, reason]) => {
  reason = 'N/A';
  if (msg.guild.settings.banRole) {
    const role = msg.guild.roles.find('id', msg.guild.settings.banRole);
    if (mem.roles.find(role)) return msg.send(`${mem.author.tag} is already rolebanned!`);
    await mem.addRole(role, reason).catch(error => msg.reply(`I couldn't roleban because of : ${error}`));
    if (msg.guild.settings.modLogs) {
      const chan = msg.guild.channels.find('id', msg.guild.settings.modLogs);
      const embed = new client.methods.Embed()
        .setColor('#ff003c')
        .setTitle('Member Rolebanned')
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
  name: 'roleban',
  description: 'Assigns a \'roleban\' role.',
  usage: '<member:member> [reason:str]',
  usageDelim: '',
  extendedHelp: '',
};