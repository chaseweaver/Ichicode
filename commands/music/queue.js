/* Displays the queue. */

exports.run = (client, msg) => {
  const handler = client.queue.get(msg.guild.id);
  if (!handler) throw `Add some songs to the queue first with ${msg.guild.settings.prefix}add`;

  const output = [];
  for (let i = 0; i < Math.min(handler.songs.length, 15); i++) {
    const tmp = ((i + 1) <= 9) ? `0${i + 1}` : `${i + 1}`;
    output.push(`${tmp}. ${handler.songs[i].title}\nRequested by: ${handler.songs[i].requester}\n`);
  }
  return msg.send([
    `**${msg.guild.name}'s Music Queue:** Currently **${output.length}** songs queued ${(handler.songs.length > 15 ? '*[Only next 15 shown]*' : '')}`,
    `${'```'}${output.join('\n')}${'```'}`,
  ].join('\n'));
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
  name: 'queue',
  description: 'Displays the music queue.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};