exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) {throw `I am not connected in a voice channel, please add some songs to the queue first with ${msg.guild.settings.prefix}add`;}
  msg.guild.voiceConnection.dispatcher.end();
  return msg.send('Music ended!');
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['stop'],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2500,
  nsfw: false,
};

exports.help = {
  name: 'end',
  description: 'Ends the song.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};