/* Joins the message author's voice channel. */

exports.run = async (client, msg, [index]) => {
  if (index <= 0) throw 'Please enter a valid index number!';
  const handler = client.queue.get(msg.guild.id);
  if (!handler) throw `Add some songs to the queue first with ${msg.guild.settings.prefix}add`;

  if (index == 1) {
    const id = handler.songs[0];
    handler.songs.splice(0, 1);
    if (handler.playing) msg.guild.voiceConnection.dispatcher.end();
    return msg.send(`**${id.title}** requested by **${id.requester}** has been removed!`);
  }

  if (!index) {
    const id = handler.songs[handler.songs.length - 1];
    handler.songs.splice(handler.songs.length - 1, 1);
    return msg.send(`**${id.title}** requested by **${id.requester}** has been removed!`);
  }

  if (handler.songs[index]) {
    const id = handler.songs[index - 1];
    handler.songs.splice(index - 1, 1);
    return msg.send(`**${id.title}** requested by **${id.requester}** has been removed!`);
  } else { return msg.send('I cannot find that index in the queue!'); }
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 10,
  botPerms: ['CONNECT', 'SPEAK'],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'remove',
  description: 'Removes a song from the queue.',
  usage: '[index:int]',
  usageDelim: '',
  extendedHelp: '',
};