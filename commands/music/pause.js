/* Pauses the current song. */

exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) throw 'I am not connected in a voice channel!';
  if (msg.guild.voiceConnection.dispatcher.paused) return msg.send('The stream is already paused.');
  msg.guild.voiceConnection.dispatcher.pause();
  return msg.send('Paused');
};

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
  name: 'pause',
  description: 'Pauses the current song.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};