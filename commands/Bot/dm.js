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
      description: 'DMs user(s).',
      quotedStringSupport: true,
      usage: '[member:member] <message:str>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [mem = msg.author, ...str]) { msg.mentions.users.map(mem => { return mem.send(str.join(' ')); }).then(msg.delete()); }
};