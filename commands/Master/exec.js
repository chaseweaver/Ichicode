const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'exec',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 10,
      botPerms: [],
      requiredConfigs: [],
      description: 'Executes an expression.',
      quotedStringSupport: true,
      usage: '<expression:str>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }
  async run(msg, [code]) {
    if (!code) return;
    const result = await this.client.methods.util.exec(code, { timeout: 30000 })
      .catch(error => ({ stdout: null, stderr: error && error.message ? error.message : error }));
    const output = result.stdout ? `OUTPUT:\n\n${result.stdout}\n` : '';
    const outerr = result.stderr ? `ERROR:\n\n${result.stderr}\n` : '';
    return msg.send([output, outerr].join('\n'), { code: 'xl' });
  }
};
