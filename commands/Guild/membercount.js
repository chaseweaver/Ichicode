const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'membercount',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 2,
      botPerms: [],
      requiredConfigs: [],
      description: 'Returns the member count of the guild.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    const onlineCount = msg.guild.members.filter(m => m.presence.status === 'online');
    return await msg.send(`${msg.guild.name} / ${msg.guild.id}` +
      `\n\nTotal guild members:    ${msg.guild.memberCount} members\n` +
      `Online guild members:   ${onlineCount.size} members\n` +
      `Offline guild members:  ${msg.guild.memberCount - onlineCount.size} members`, { code: 'xl' })
      .catch(err => console.log(err, 'error'));
  }
};