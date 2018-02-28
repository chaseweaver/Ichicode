/* Returns the time remaining in the queued song. */

const moment = require('moment');
require('moment-duration-format');
exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) throw 'I am not connected in a voice channel!';
  const handler = client.queue.get(msg.guild.id);
  if (!handler || handler.playing === false) throw 'I am not playing music.';
  return msg.send(`Time remaining: ${moment.duration((handler.songs[0].seconds * 1000) - msg.guild.voiceConnection.dispatcher.time).format('h:mm:ss', { trim: false })}`);
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
  name: 'time',
  description: 'Returns the time remaining in the song.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};