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
    return msg.send(`Time remaining: ${moment.duration((handler.songs[0].seconds * 1000) - msg.guild.voiceConnection.dispatcher.streamTime).format('h:mm:ss', { trim: false })}`);
  }
};