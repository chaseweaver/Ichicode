const yt = require('ytdl-core');

exports.run = async (client, msg) => {
  if (client.queue.has(msg.guild.id) === false) 
    throw `Add some songs to the queue first with ${msg.guild.settings.prefix}add`;
  if (!msg.guild.voiceConnection) {
    await client.commands.get('join').run(client, msg);
    return this.run(client, msg);
  }

  const handler = client.queue.get(msg.guild.id);
  if (handler.playing) throw 'Already Playing!';
  handler.playing = true;

  (function play(song) {
    if (song === undefined) {
      return msg.channel.send('The queue is empty!').then(() => {
        handler.playing = false;
        return msg.member.voiceChannel.leave();
      });
    }

    msg.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**!`)
      .catch(err => client.emit('log', err, 'error'));

    return msg.guild.voiceConnection.playStream(yt(song.url, {audioonly: true}), {passes: 2})
      .on('end', () => {
        setTimeout(() => {
          handler.songs.shift();
          play(handler.songs[0]);
        }, 100);
      })
      .on('error', err => msg.channel.send(`error: ${err}`).then(() => {
        handler.songs.shift();
        play(handler.songs[0]);
      }));
  }(handler.songs[0]));

  return null;
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
  name: 'play',
  description: 'Plays the queue.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};