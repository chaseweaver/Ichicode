exports.run = async (client, msg) => {
  const mem = msg.mentions.members.first();
  if (msg.mentions.members.size === 0) return;
  return msg.channel.send(`${mem.user.username}\`s ID: ${mem.user.id}`, { code: 'xl' }).catch(err => console.log(err, 'error'));
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
  name: 'memberid',
  description: 'Returns a member ID.',
  usage: '<member>',
  usageDelim: '',
  extendedHelp: '',
};