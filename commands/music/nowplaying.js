/* Displays the currently playing song. */

exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) throw 'I am not connected in a voice channel!';
  const handler = client.queue.get(msg.guild.id);
  if (!handler) throw `Add some songs to the queue first with ${msg.guild.settings.prefix}add`;
  if (!handler.playing) throw 'I am not playing anything!';
  msg.send(`Playing: **${handler.songs[0].title}**\nRequested by: **${handler.songs[0].requester}**!`)
    .catch(err => client.emit('log', err, 'error'));
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['np'],
  permLevel: 0,
  botPerms: ['CONNECT', 'SPEAK'],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'nowplaying',
  description: 'Displays the currently playing song.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};