const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'channels',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: [],
      requiredConfigs: [],
      description: 'Lists guild channels.',
      quotedStringSupport: true,
      usage: '[text|voice|category]',
      usageDelim: ' ',
      extendedHelp: null,
    });
  }

  async run(msg, [type]) {
    let str = `== ${msg.guild.name} channels ==\n\n`;
    let num = 1;
    switch (type) {
    case 'text':
      msg.guild.channels.array().forEach(e => {
        if (e.type === 'text') str = num <= 9 ? str += ` ${num++} :: #${e.name}\n` : str += `${num++} :: #${e.name}\n`;
      });
      break;
    case 'voice':
      msg.guild.channels.array().forEach(e => {
        if (e.type === 'voice') str = num <= 9 ? str += ` ${num++} :: #${e.name}\n` : str += `${num++} :: #${e.name}\n`;
      });
      break;
    case 'category':
      msg.guild.channels.array().forEach(e => {
        if (e.type === 'category') str = num <= 9 ? str += ` ${num++} :: #${e.name}\n` : str += `${num++} :: #${e.name}\n`;
      });
      break;
    default:
      msg.guild.channels.array().forEach(e => {
        let tmp = '';
        if (e.type === 'category') tmp += '  ';
        if (e.type === 'text') tmp += '      ';
        if (e.type === 'voice') tmp += '     ';
        str = num <= 9 ? str += ` ${num++} :: [${e.type}]${tmp}#${e.name}\n` : str += `${num++} :: [${e.type}]${tmp}#${e.name}\n`;
      });
    }
    return msg.send(str, { code: 'asciidoc' }).catch(err => console.log(err, 'error'));
  }
};