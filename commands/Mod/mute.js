const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'mute',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 5,
      botPerms: ['MANAGE_ROLES'],
      requiredConfigs: [],
      description: 'Mutes a user.',
      quotedStringSupport: true,
      usage: '<member:member> [reason:str]',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [mem, ...reason]) {
    if (mem.id === this.client.owner.id) throw 'I will *not* mute my master!';
    if (mem.id === this.client.user.id) throw 'Have I done something wrong?';

    if (mem.roles.find('name', msg.guild.configs.muteRole)) return msg.send(`${mem.user.username} is already muted!`);

    await mem.roles.add(msg.guild.configs.muteRole)
      .catch(error => msg.reply(`I couldn't mute ${mem.user.tag} because of : ${error}`));

    reason = reason.length > 0 ? reason.join(' ') : 'N/A';

    if (msg.guild.configs.modLogChannel && msg.guild.configs.modLogChannel) {
      const chan = mem.guild.channels.find('id', mem.guild.configs.modLogChannel);
      if (!chan) return;
      const embed = new this.client.methods.Embed()
        .setColor('#faff00')
        .setTitle('Member Muted')
        .setThumbnail(mem.user.displayAvatarURL())
        .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL())
        .addField('Member', `${mem.user.tag} / ${mem.user.id}`)
        .addField('Reason', reason)
        .setTimestamp();
      return await chan.send({ embed }).catch(console.error);
    }
  }
};