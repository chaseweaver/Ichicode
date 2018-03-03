/* Changes roles for a mentioned user. */

exports.run = async (client, msg, [action, role, mem]) => {
  if (!msg.guild.roles.find('name', role)) return msg.send('I couldn\'t find that role!');
  if (!mem) return msg.send('I couldn\'t find that member!');
  const rol = msg.guild.roles.find('name', role);

  switch (action) {
  case 'add':
    if (mem.roles.find('name', role)) return msg.send(`${mem.user.username} already has that role!`);
    await mem.roles.add(rol)
      .catch(error => msg.reply(`I couldn't add ${rol} to ${mem.user.username} because of : ${error}`));
    msg.send(`**${rol}** has been added to **${mem.user.tag}**.`);
    break;
  case 'remove':
    if (!mem.roles.find('name', role)) return msg.send(`${mem.user.username} doesn't have that role!`);
    await mem.roles.remove(rol)
      .catch(error => msg.reply(`I couldn't remove ${rol} to ${mem.user.tag} because of : ${error}`));
    msg.send(`**${rol}** has been removed from **${mem.user.tag}**.`);
  }

  if (msg.guild.settings.logRoleChange && msg.guild.settings.modLogs) {
    const chan = msg.guild.channels.find('id', msg.guild.settings.modLogs);
    const embed = new client.methods.Embed()
      .setColor('#faff00')
      .setTitle(`Role ${action}`)
      .setThumbnail(mem.user.displayAvatarURL)
      .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL)
      .addField('Member', `${mem.user.tag} / ${mem.user.id}`)
      .addField('Role', rol)
      .setTimestamp(new Date());
    return await chan.send({ embed }).catch(console.error);
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
  name: 'roles',
  description: 'Adds / Removes a role from a user',
  usage: '<add|remove> <role:str> <member:member>',
  usageDelim: ' ',
  extendedHelp: '',
};