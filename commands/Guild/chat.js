exports.run = async (client, msg, [channel, chat]) => {
  const chan = await msg.guild.channels.find('name', channel);
  if (!chan) return msg.channel.send('I cannot find that channel!');
  return chan.send(chat).then(() => msg.delete()).catch(err => console.log(err, 'error'));
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
  name: 'chat',
  description: 'Send a chat to another channel.',
  usage: '<channel:str> <chat:str>',
  usageDelim: '|',
  extendedHelp: '',
};