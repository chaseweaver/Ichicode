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
      extendedHelp: null,
    });
  }

  async run(msg, [mem = msg.author, ...str]) { 
    return msg.mentions.users.map(mem => mem.send(str.join(' '))); 
    msg.delete(); 
  }
};