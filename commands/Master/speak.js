const { Command } = require('klasa');
const tts = require('google-tts-api');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'speak',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 2,
      botPerms: [],
      requiredConfigs: [],
      description: 'Speak in a voice chat.',
      quotedStringSupport: true,
      usage: '<message:str>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }
  async run(msg, message) {
    try {
      const { voiceChannel } = msg.member;
      if (!voiceChannel) return msg.send('You are not conected in a voice channel!');
      if (!msg.guild.voiceConnection) msg.send('I am not connected in a voice channel! Attempting now . . .');
      if (!msg.guild.voiceConnection) {
        await msg.client.commands.get('join').run(msg);
        return this.run(msg);
      }

      await tts(message.join(' '), 'en', 1)
        .then(function(url) {
          return msg.guild.voiceConnection.play((url), { passes: 2, bitrate: 'auto' })
            .on('error', err => msg.send(`Error: ${err}`).then(() => {
              msg.send('An error has occured. Perhaps the stream could not keep up. Please try again.');
            }));
        })
        .catch(function(err) {
          console.error(err.stack);
        });
    } catch (err) { console.log(err); }
  }
};
