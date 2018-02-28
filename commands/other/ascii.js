const figletAsync = require('util').promisify(require('figlet'));

exports.run = async (client, msg, [channel, chat]) => {
  let chan = await msg.guild.channels.find('name', channel);
  if (!chan) chan = msg.channel;
  const rep = await figletAsync(chat);
  return chan.send(rep, { code: true }).then(msg.delete());
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ['text', 'dm', 'group'],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ['figlet'],
};

exports.help = {
  name: 'ascii',
  description: 'Replies with an ASCII banner.',
  usage: '[channel:str] <chat:str>',
  usageDelim: '|',
  type: 'commands',
};