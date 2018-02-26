exports.run = async (client, msg) => {
  const gui = msg.guild;
  let onlineCount = gui.members.filter(m => m.presence.status === 'online');
  return await msg.channel.send(`[${gui.nameAcronym}] ${gui.name}` +
      `\n\nTotal guild members:    ${gui.memberCount} members\nOnline guild members:   ${onlineCount.size} members\nOffline guild members:  ${gui.memberCount - onlineCount.size} members`, { code: 'xl' }).catch(err => console.log(err, 'error'));
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2500,
  nsfw: false,
};

exports.help = {
  name: 'membercount',
  description: 'Returns the member count of the guild.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};