const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'caps',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: [],
      requiredConfigs: [],
      description: 'rEtUnRs WoRdS lIkE tHiS.',
      quotedStringSupport: true,
      usage: '<message:str>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [str]) {
    let build = '';
    for (let i = 0; i < str.length; i++) {
      if (i % 2 == 0) build += str.charAt(i).toLowerCase();
      else build += str.charAt(i).toUpperCase();
    }
    return msg.send(build);
  }
};