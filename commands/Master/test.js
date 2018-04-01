const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'test',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 10,
      botPerms: [],
      requiredConfigs: [],
      description: 'Whatever test.',
      quotedStringSupport: true,
      usage: '',
      usageDelim: '',
      extendedHelp: '',
    });
  }

  async run(msg) {
    let str = '';
    for (let i = 0; i < 10; i++) {
      str += `:rusy_${i}1::rusy_${i}2::rusy_${i}3::rusy_${i}4::rusy_${i}5::rusy_${i}6::rusy_${i}7::rusy_${i}8::rusy_${i}9::rusy_${i + 1}0:\n`;
    }
    return msg.send(str);
  }
};