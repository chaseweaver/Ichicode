/* Plays the song in the queue. */

const yt = require('ytdl-core');
exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) throw 'I am not connected in a voice channel!';
  if (!msg.guild.voiceConnection) {
    await client.commands.get('join').run(client, msg);
    return this.run(client, msg);
  }

  const handler = client.queue.get(msg.guild.id);
  if (handler.playing) throw 'Already Playing!';
  handler.playing = true;

  (function play(song) {
    if (song === undefined) {
      return msg.send('The queue is empty!').then(() => {
        handler.playing = false;
        setTimeout(() => {
          return msg.member.voiceChannel.leave();
        }, 60000);
      });
    }

    msg.send(`Playing: **${song.title}**\nRequested by: **${song.requester}**!`)
      .catch(err => client.emit('log', err, 'error'));

    return msg.guild.voiceConnection.play(yt(song.url, { audioonly: true, quality: 'highestaudio' }),
      { passes: 2, bitrate: 'auto' })
      .on('end', () => {
        setTimeout(() => {
          handler.songs.shift();
          play(handler.songs[0]);
        }, 100);
      })
      .on('error', err => msg.send(`error: ${err}`).then(() => {
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
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'play',
  description: 'Plays the song queue.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};