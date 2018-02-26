/* Returns the ID of the channel. */

exports.run = async (client, msg, [channel]) => {
  const chan = await msg.guild.channels.find('name', channel);
  if (!chan) return msg.channel.send('I cannot find that channel!', { code: 'xl' });
  return msg.channel.send(`#${chan.name}\`s ID: ${chan.id}`, { code: 'xl' }).catch(err => console.log(err, 'error'));
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['role'],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2500,
  nsfw: false,
};

exports.help = {
  name: 'channelid',
  description: 'Returns channel ID.',
  usage: '<channel:str>',
  usageDelim: '',
  extendedHelp: '',
};