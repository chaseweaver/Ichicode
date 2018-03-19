const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'join',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['summon'],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Joins the user\'s current voice channel.',
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
      await voiceChannel.join();
      return msg.send(`Connected to the voice channel ${voiceChannel}.`).then(msg.delete());
    } catch (err) { console.log(err); }
  }
};