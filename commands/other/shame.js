exports.run = (client, msg, [member]) => msg.channel.send(`🔔 SHAME 🔔 ${member} 🔔 SHAME 🔔`);

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'shame',
  description: 'Shames a user.',
  usage: '<member:member>',
  usageDelim: ' ',
  extendedHelp: '',
};