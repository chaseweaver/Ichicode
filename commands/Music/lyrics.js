const { Command } = require('klasa');
const getLyrics = require('lyric-get');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'lyrics',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 10,
      botPerms: [],
      requiredConfigs: [],
      description: 'Fetches lyrics from a song.',
      quotedStringSupport: true,
      usage: '<song:str> <artist:str>',
      usageDelim: ' by ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [song, artist]) {
    getLyrics.get(artist, song, function(err, res) {
      if (err) msg.send('I could not find the source! Perhaps try to rephrase?');
      else msg.send(`${artist} - ${song}\n\n\n` + res, { code: true, split: true });
    });
  }
};