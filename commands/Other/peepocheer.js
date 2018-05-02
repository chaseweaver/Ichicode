const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'peepocheer',
      enabled: true,
      runIn: ['text'],
      cooldown: 0,
      bucket: 1,
      aliases: ['cheer'],
      permLevel: 5,
      botPerms: [],
      requiredConfigs: [],
      description: ':peepocheer:',
      quotedStringSupport: true,
      usage: '<message:message>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [message]) {
    return await msg.channel.messages.fetch({ limit: 1, around: message.id })
      .then(msg.delete())
      .then(message.react('441350022232145922'))
      .then(message.react('441350051273375754'))
      .then(message.react('441350074237190164'))
      .then(message.react('441350084832264192'))
      .then(message.react('441350128465477642'))
      .then(message.react('441350137525043218'))
      .then(message.react('441350145238630411'))
      .then(message.react('441350154432413698'))
      .then(message.react('441350170815496212'))
      .then(message.react('441350181611503627'))
      .then(message.react('441350189509509120'))
      .then(message.react('441350196958461954'))
      .then(message.react('441350206236262400'))
      .then(message.react('441350216935931904'))
      .then(message.react('441350224045277197'))
      .then(message.react('441350234698678293'))
      .then(message.react('441350241992572938'))
      .then(message.react('441350250490232833'))
      .then(message.react('441350258786828288'))
      .then(message.react('441350266282049556'));
  }
};