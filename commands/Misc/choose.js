const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'choose',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 2,
      bucket: 1,
      aliases: ['pick', 'select'],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Let me choose between some options for you!',
      quotedStringSupport: true,
      usage: '<option1:str> <option2:str> [...]',
      usageDelim: ' or ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [option1, option2, ...ext]) {
    const opt = [option1, option2];
    ext.slice(' or ').forEach(e => { opt.push(e); });
    const src = [Math.floor(Math.random() * opt.length)];
    return msg.send(`I choose **${opt[src]}**!`);
  }
};