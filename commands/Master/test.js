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
    const ata = await JSON.stringify(msg.attachments);
    const final = await JSON.parse(ata);
    const n = final[0].url.lastIndexOf('/');
    console.log(final[0].url.substring(n + 1, final[0].url.length));
  }
};