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
      permLevel: 3,
      botPerms: [],
      requiredConfigs: [],
      description: 'Speak in a voice chat.',
      quotedStringSupport: true,
      usage: '[speed:float{0,2}] <message:str{0,200}>',
      usageDelim: ' ',
      extendedHelp: 'Message must be less than 200 characters.',
    });
  }
  async run(msg, [speed = 1, message]) {
    try {
      const { voiceChannel } = msg.member;
      if (!voiceChannel) return msg.send('You are not conected to a voice channel!');
      if (!msg.guild.voiceConnection) return msg.send(`I am not conected to a voice channel! Try ${msg.guild.configs.prefix}join`);

      await tts(message.join(' '), 'en', speed)
        .then(function(url) {
          msg.delete();
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
