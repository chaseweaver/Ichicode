const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'volume',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['vol'],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Adjusts STREAM volume (not CLIENT volume).',
      quotedStringSupport: true,
      usage: '[vol:int]',
      usageDelim: '',
      extendedHelp: 'Enter an integer between 1 - 200. 50% volume is default.',
    });
  }

  async run(msg, [vol = null]) {
    if (!msg.guild.voiceConnection) throw 'I am not connected in a voice channel';
    const handler = this.client.queue.get(msg.guild.id);
    if (!handler || handler.playing === false) throw 'I am not playing music.';

    const { dispatcher } = msg.guild.voiceConnection;

    if (!vol) return msg.send(`Current volume: ${dispatcher.volume * 50}%`);
    if (vol >= 1 && vol <= 200) {
      dispatcher.setVolume(vol / 50);
      return msg.send(`Volume: ${dispatcher.volume * 50}%`);
    }
    return msg.send('Please enter an integer between 1 - 200!');
  }
};