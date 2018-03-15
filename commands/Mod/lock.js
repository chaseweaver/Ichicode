const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'lock',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['lockdown'],
      permLevel: 10,
      botPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
      requiredConfigs: [],
      description: 'Locks a channel.',
      quotedStringSupport: true,
      usage: '[channel:channel]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [channel = msg.channel]) {
    const type = channel.type === 'text' ? 'SEND_MESSAGES' : 'CONNECT';
    await channel.overwritePermissions(channel.guild.defaultRole, { [type]: false });
    if (msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES') === false) return true;
    return msg.send('This channel is under lockdown.');
  }
};