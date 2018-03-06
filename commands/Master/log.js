const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'log',
      enabled: true,
      runIn: ['dm'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 10,
      botPerms: [],
      requiredConfigs: [],
      description: 'Returns output logs by path.',
      quotedStringSupport: true,
      usage: '<path:str>',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }
  async run(msg, path) {
    const result = await this.client.methods.util.exec(`cat ${path}`, { timeout: 30000 })
      .catch(error => ({ stdout: null, stderr: error && error.message ? error.message : error }));
    const output = result.stdout ? `OUTPUT:\n\n${result.stdout.slice(result.stdout.length - 1980, result.stdout.length)}\n` : '';
    const outerr = result.stderr ? `ERROR:\n\n${result.stderr.slice(result.stderr.length - 1980, result.stderr.length)}\n` : '';
    return msg.send([output, outerr].join('\n'), { code: 'xl' });
  }
};
