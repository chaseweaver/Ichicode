const { Command } = require('klasa');
const figletAsync = require('util').promisify(require('figlet'));

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'ascii',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 5,
      botPerms: [],
      requiredConfigs: [],
      description: 'Replies with an ASCII banner.',
      quotedStringSupport: true,
      usage: '[channel:channel] <message:string> [...]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [channel = msg.channel, ...message]) {
    if (channel.postable === false && channel !== msg.channel) throw 'The selected channel is not postable.';
    return channel.send(await figletAsync(message.join(' ')), { code: true }).then(() => msg.delete());
  }
};