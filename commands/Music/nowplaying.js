const { Command } = require('klasa');
const moment = require('moment');
require('moment-duration-format');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'nowplaying',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['np'],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Shows the currently playing song.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    try {
      if (!msg.guild.voiceConnection) return msg.send('I am not connected in a voice channel!');
      const handler = this.client.queue.get(msg.guild.id);
      if (!handler) return msg.send(`Add some songs to the queue first with ${msg.guild.configs.prefix}add`);
      if (!handler.playing) return msg.send('I am not playing anything!');

      const timeRemaining = !handler.songs[0].upload ? `${moment.duration((handler.songs[0].seconds * 1000) - msg.guild.voiceConnection.dispatcher.streamTime).format('h:mm:ss', { trim: false })}` : 'N/A';

      const embed = new msg.client.methods.Embed()
        .setColor('#ff003c')
        .setTitle(handler.songs[0].title)
        .setThumbnail(handler.songs[0].thumbnail)
        .setAuthor(msg.client.user.username, msg.client.user.displayAvatarURL())
        .addField('Time Remaining', timeRemaining, true)
        .addField('Length', handler.songs[0].length, true)
        .addField('Requested By', handler.songs[0].requester, true)
        .setURL(handler.songs[0].url)
        .setTimestamp();
      msg.sendEmbed(embed).catch(err => this.client.emit('log', err, 'error'));
    } catch (err) { console.log(err); }
  }
};