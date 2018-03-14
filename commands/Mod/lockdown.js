const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'lockdown',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['lock', 'unlock'],
      permLevel: 10,
      botPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
      requiredConfigs: [],
      description: 'Locks/Unlocks a channel.',
      quotedStringSupport: true,
      usage: '[channel:channel]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [chan]) {
    if (!chan) channel = msg.guild.channel;
    const locked = await this.handleLockdown(chan, chan.type === 'text' ? 'SEND_MESSAGES' : 'CONNECT');
    if (msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES') === false) return true;
    return msg.send(`${msg.language.get('COMMAND_LOCKDOWN_SUCCESSFULLY')} ${locked ? '' : 'un'}${msg.language.get('COMMAND_LOCKDOWN_LOCKED')} ${chan}`);
  }

  handleLockdown(chan, perm) {
    const overwrite = chan.permissionOverwrites.get(chan.guild.defaultRole.id);
    const locked = overwrite ? overwrite.denied.has(perm) : false;
    return chan.overwritePermissions(chan.guild.defaultRole, { [perm]: locked }, locked ? 'Lockdown released.' : 'Lockdown to prevent spam.')
      .then(() => !locked);
  }
};