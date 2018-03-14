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
      permLevel: 3,
      botPerms: ['MANAGE_ROLES'],
      requiredConfigs: [],
      description: 'Unmutes a user.',
      quotedStringSupport: true,
      usage: '<member:member>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [mem]) {
    if (mem.roles.find('name', msg.guild.configs.muteRole)) return msg.send(`${mem.user.username} is already muted!`);

    await mem.roles.remove(msg.guild.configs.muteRole)
      .catch(error => msg.reply(`I couldn't unmute ${mem.user.tag} because of : ${error}`));
    msg.send(`**${msg.guild.configs.muteRole}** has been removed from **${mem.user.tag}**.`).then(msg.delete(5000));

    if (msg.guild.configs.modLogChannel && msg.guild.configs.modLogChannel) {
      const embed = new this.client.methods.Embed() 
        .setColor('#faff00')
        .setTitle(`Member Unmuted`)
        .setThumbnail(mem.user.displayAvatarURL)
        .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL)
        .addField('Member', `${mem.user.tag} / ${mem.user.id}`)
        .addField('Role', msg.guild.configs.muteRole)
        .setTimestamp();
      return await msg.guild.configs.modLogChannel.send({ embed }).catch(console.error);
    }
  }
};