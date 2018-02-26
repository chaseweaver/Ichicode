/* Replies with response time/delay of bot. */

exports.run = async (client, msg) => {
  const message = await msg.channel.sendMessage('Ping?').catch(err => console.log(err, 'error'));
  message.edit(`Pong! (took: ${message.createdTimestamp - msg.createdTimestamp}ms)`).then(() => msg.delete());
};

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2500,
  nsfw: false,
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};