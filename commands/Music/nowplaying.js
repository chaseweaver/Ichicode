const { Command } = require('klasa');

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

      const timeRemaining = !handler.songs[0].upload ? `${this.fmtHMS(((handler.songs[0].seconds * 1000) - msg.guild.voiceConnection.dispatcher.streamTime) / 1000)}` : 'N/A';

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

  fmtHMS(sec) {
    let seconds = Math.floor(sec), hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    if (hours < 10) { hours = '0' + hours; }
    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }
    return hours + 'h ' + minutes + 'm ' + seconds + 's';
  }
};