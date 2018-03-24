const { Command } = require('klasa');
const yt = require('ytdl-core');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'play',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Plays a song from the queue.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    try {
      const { voiceChannel } = msg.member;
      if (!voiceChannel) return msg.send('You are not conected in a voice channel!');
      if (!msg.guild.voiceConnection) msg.send('I am not connected in a voice channel! Attempting now . . .');
      if (!msg.guild.voiceConnection) {
        await msg.client.commands.get('join').run(msg);
        return this.run(msg);
      }

      const handler = msg.client.queue.get(msg.guild.id);
      if (handler.playing) return msg.send('Already Playing!');
      handler.playing = true;

      (function play(song) {
        try {
          if (song === undefined) {
            if (!handler.song) {
              console.log(handler);
              return msg.send('There was an error with the stream! Blame Discord.');
            } else if (!handler.song.length !== 0) {
              msg.send('There was an error with the stream! Playing next song in queue!');
              handler.songs.shift();
              play(handler.songs[0]);
            } else {
              return msg.send('The queue is empty! Leaving voice channel in 5 minutes.').then(() => {
                handler.playing = false;
                msg.client.user.setActivity('+help', { type: 'LISTENING' });
                setTimeout(() => {
                  return msg.member.voiceChannel.leave();
                }, 1000 * 60 * 5);
              });
            }
          }

          if (handler.songs.length !== 1) {
            const embed = new msg.client.methods.Embed()
              .setColor('#ff003c')
              .setTitle(song.title)
              .setThumbnail(song.thumbnail)
              .setAuthor(msg.client.user.username, msg.client.user.displayAvatarURL())
              .addField('Length', song.length, true)
              .addField('Requested By', song.requester, true)
              .setURL(song.url)
              .setTimestamp();
            msg.sendEmbed(embed).catch(err => msg.client.emit('log', err, 'error'));
          }

          if (!handler.songs[0].upload) msg.client.user.setActivity(song.title, { type: 'LISTENING' });

          if (!handler.songs[0].upload) {
            return msg.guild.voiceConnection.play(yt(song.url, { quality: 'highestaudio' }),
              { passes: 2, bitrate: 'auto' })
              .on('end', () => {
                setTimeout(() => {
                  handler.songs.shift();
                  play(handler.songs[0]);
                }, 100);
              })
              .on('error', err => msg.send(`Error: ${err}`).then(() => {
                msg.send('An error has occured. Perhaps the video is restricted, private, or the stream could not keep up. Please try again.');
                handler.songs.shift();
                play(handler.songs[0]);
              }));
          } else {
            return msg.guild.voiceConnection.play((song.url), { passes: 2, bitrate: 'auto' })
              .on('end', () => {
                setTimeout(() => {
                  handler.songs.shift();
                  play(handler.songs[0]);
                }, 100);
              })
              .on('error', err => msg.send(`Error: ${err}`).then(() => {
                msg.send('An error has occured. Perhaps the video is restricted, private, or the stream could not keep up. Please try again.');
                handler.songs.shift();
                play(handler.songs[0]);
              }));
          }
        } catch (err) { console.log(err); msg.send('YouTube could not handle the stream! Please try again!'); }
      }(handler.songs[0]));
      return null;
    } catch (err) { console.log(err); }
  }
};