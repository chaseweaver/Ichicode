exports.run = async (client, msg, [url]) => {
  return await msg.client.user.setAvatar(url).then(() => msg.delete()).catch(console.error);
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2500,
  nsfw: false,
};

exports.help = {
  name: 'botavatar',
  description: 'Set\'s the bot\'s avatar.',
  usage: '<url:url>',
  usageDelim: '',
  extendedHelp: '',
};

