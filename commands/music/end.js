/* Ends current playing song. */

exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) throw 'I am not connected in a voice channel!';
  msg.guild.voiceConnection.dispatcher.end();
  return msg.send('Music ended!');
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['stop'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'end',
  description: 'Ends the song.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};