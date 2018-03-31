const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'unmute',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,  
      aliases: [],
      permLevel: 5,
      botPerms: ['MANAGE_ROLES'],
      requiredConfigs: [],
      description: 'Unmutes a user.',
      quotedStringSupport: true,
      usage: '<member:member> [reason:str]',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [mem, ...reason]) {
    if (mem.roles.find('name', msg.guild.configs.muteRole)) return msg.send(`${mem.user.username} is already muted!`);

    await mem.roles.remove(msg.guild.configs.muteRole)
      .catch(error => msg.reply(`I couldn't unmute ${mem.user.tag} because of : ${error}`));

    const options = {};
    reason = reason.length > 0 ? reason.join(' ') : 'N/A';
    if (reason) options.reason = reason;

    if (msg.guild.configs.modLogChannel && msg.guild.configs.modLogChannel) {
      const chan = mem.guild.channels.find('id', mem.guild.configs.modLogChannel);
      if (!chan) return;
      const embed = new this.client.methods.Embed() 
        .setColor('#faff00')
        .setTitle(`Member Unmuted`)
        .setThumbnail(mem.user.displayAvatarURL())
        .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL())
        .addField('Member', `${mem.user.tag} / ${mem.user.id}`)
        .addField('Reason', reason)
        .setTimestamp();
      return await chan.send({ embed }).catch(console.error);
    }
  }
};