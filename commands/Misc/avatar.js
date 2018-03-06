const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'avatar',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 2,
      bucket: 1,
      aliases: ['pfp', 'icon'],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Get the avatar URL tagged member(s).',
      quotedStringSupport: true,
      usage: '[member:member]',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    if (!msg.mentions.users.size) await msg.send(msg.author.displayAvatarURL({ size: 2048 }));
    msg.mentions.users.map(usr => { return msg.send(`${usr.username}'s avatar: ${usr.displayAvatarURL({ size: 2048 })}\n`); });
  }
};