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

  async run(msg, mem) {
    if (!msg.mentions.users.size) {
      const authorImg = new this.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .setTitle(`${msg.author.tag}'s Avatar`)
        .setImage(msg.author.displayAvatarURL({ size: 2048 }))
        .setURL(msg.author.displayAvatarURL({ size: 2048 }))
      return msg.sendEmbed(authorImg).catch(console.error);
    } else {
      const memImg = new this.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .setTitle(`${msg.mentions.members.first().user.tag}'s Avatar`)
        .setImage(msg.mentions.users.first().displayAvatarURL({ size: 2048 }))
        .setURL(msg.mentions.users.first().displayAvatarURL({ size: 2048 }))
      return msg.sendEmbed(memImg).catch(console.error);
    }
  }
};