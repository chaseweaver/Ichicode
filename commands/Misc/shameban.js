const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'shameban',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 5,
      botPerms: [],
      requiredConfigs: [],
      description: 'Shame bans a user.',
      quotedStringSupport: true,
      usage: '<member:member>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [member]) { msg.send(`🔨 BAN 🔨 ${member} 🔨 BAN 🔨`).then(() => msg.delete()); }
};