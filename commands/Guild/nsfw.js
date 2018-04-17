const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'nsfw',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [''],
      permLevel: 5,
      botPerms: [],
      requiredConfigs: [],
      description: 'Returns NSFW block message.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: null,
    });
  }

  async run(msg) {
    return msg.send(`Assuming you have a job and your boss walks behind you and looks at your screen, would you be okay with them seeing this kind of content? Thank you for understanding.`, { code: 'txt' })
      .then(msg.delete());
  }
};