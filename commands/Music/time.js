const { Command } = require('klasa');
const moment = require('moment');
require('moment-duration-format');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'time',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Shows current remaining time of song.',
      quotedStringSupport: true,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    if (!msg.guild.voiceConnection) throw 'I am not connected in a voice channel!';
    const handler = this.client.queue.get(msg.guild.id);
    if (!handler || handler.playing === false) throw 'I am not playing music.';
    const final = !handler.songs[0].upload ? `${this.fmtHMS(((handler.songs[0].seconds * 1000) - msg.guild.voiceConnection.dispatcher.streamTime) / 1000)}` : 'N/A';
    return msg.send(`Time remaining: ${final}`);
  }

  fmtHMS(sec) {
    let seconds = Math.floor(sec), hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    if (hours   < 10) hours   = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    return hours + 'h ' + minutes + 'm ' + seconds + 's';
  }
};