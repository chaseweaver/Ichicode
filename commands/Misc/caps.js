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
      permLevel: 5,
      botPerms: [],
      requiredConfigs: [],
      description: 'rEtUnRs WoRdS lIkE tHiS.',
      quotedStringSupport: true,
      usage: '[channel:channel] <message:string> [...]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [channel = msg.channel, ...str]) {
    if (channel.postable === false && channel !== msg.channel) msg.send('The selected channel is not postable.');
    str = str.join(' ');
    let build = '';
    for (let i = 0; i < str.length; i++) {
      if (i % 2 == 0) build += str.charAt(i).toLowerCase();
      else build += str.charAt(i).toUpperCase();
    }
    msg.delete();
    return channel.send(build);
  }
};