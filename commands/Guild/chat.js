const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'chat',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['echo'],
      permLevel: 3,
      botPerms: [],
      requiredConfigs: [],
      description: 'Send a chat to another channel.',
      quotedStringSupport: false,
      usage: '[channel:channel] <message:string> [...]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [channel = msg.channel, ...message]) {
    if (channel.postable === false && channel !== msg.channel) return     msg.send('The selected channel is not postable.');
    return channel.send(message.join(' ') || message).then(() => msg.delete());
  }
};