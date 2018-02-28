/* Returns the member count of the guild. */

exports.run = async (client, msg) => {
  const onlineCount = msg.guild.members.filter(m => m.presence.status === 'online');
  return await msg.send(`[${msg.guild.nameAcronym}] ${msg.guild.name}` +
      `\n\nTotal guild members:    ${msg.guild.memberCount} members\n` +
      `Online guild members:   ${onlineCount.size} members\n` +
      `Offline guild members:  ${msg.guild.memberCount - onlineCount.size} members`, { code: 'xl' })
    .catch(err => console.log(err, 'error'));
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'membercount',
  description: 'Returns the member count of the guild.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};