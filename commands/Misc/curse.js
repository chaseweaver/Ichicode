const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'curse',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 5,
      botPerms: [],
      requiredConfigs: [],
      description: 'Curses a user.',
      quotedStringSupport: true,
      usage: '<member:member>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [member]) { msg.send(`👻 CURSE 👻 ${member} 👻 CURSE 👻`).then(() => msg.delete()); }
};