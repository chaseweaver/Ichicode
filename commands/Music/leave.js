const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'leave',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 2,
      botPerms: [],
      requiredConfigs: [],
      description: 'Leaves the bots\'s current voice channel.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    try {
      await msg.member.voiceChannel.leave();
      return msg.send(`Left ${msg.member.voiceChannel}.`).then(() => msg.delete());
    } catch (err) { console.log(err); }
  }
};