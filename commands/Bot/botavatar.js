const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'botavatar',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 10,
      botPerms: [],
      requiredConfigs: [],
      description: 'Sets the bot\'s avatar.',
      quotedStringSupport: true,
      usage: '<url:url>',
      usageDelim: '',
      extendedHelp: null,
    });
  }

  async run(msg, [url]) { 
    return await msg.client.user.setAvatar(url)
      .then(() => msg.delete()).catch(console.error);
  }
};