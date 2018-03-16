const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'dm',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: [],
      requiredConfigs: [],
      description: 'DM a user.',
      quotedStringSupport: true,
      usage: '<member:member> <message:str>',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [mem, ...str]) { mem.send(str.join(' ')); }
};