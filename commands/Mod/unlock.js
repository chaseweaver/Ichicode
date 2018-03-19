const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'unlock',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['lockdown'],
      permLevel: 10,
      botPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
      requiredConfigs: [],
      description: 'Unlocks a channel.',
      quotedStringSupport: true,
      usage: '[channel:channel]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [chan = msg.channel]) {
    const locked = await chan.overwritePermissions({ id: chan.guild.defaultRole }, { overwrites: [{ id: chan.guild.defaultRole, allowed: chan.type === 'text' ? 'SEND_MESSAGES' : 'CONNECT' }]});
    return msg.send(locked ? 'Lockdown released.' : 'This channel is already unlocked!');
  }
};