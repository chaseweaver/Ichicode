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
      permLevel: 3,
      botPerms: ['MANAGE_ROLES'],
      requiredConfigs: [],
      description: 'Mutes a user.',
      quotedStringSupport: true,
      usage: '<member:member>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [mem]) {
    if (mem.roles.find('name', msg.guild.configs.muteRole)) return msg.send(`${mem.user.username} is already muted!`);

    await mem.roles.add(msg.guild.configs.muteRole)
      .catch(error => msg.reply(`I couldn't mute ${mem.user.tag} because of : ${error}`));
    msg.send(`**${msg.guild.configs.muteRole}** has been added to **${mem.user.tag}**.`).then(msg.delete(5000));

    if (msg.guild.configs.modLogChannel && msg.guild.configs.modLogChannel) {
      const chan = mem.guild.channels.find('id', mem.guild.configs.modLogChannel);
      if (!chan) return;
      const embed = new this.client.methods.Embed() 
        .setColor('#faff00')
        .setTitle(`Member Muted`)
        .setThumbnail(mem.user.displayAvatarURL)
        .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL)
        .addField('Member', `${mem.user.tag} / ${mem.user.id}`)
        .addField('Role', msg.guild.configs.muteRole)
        .setTimestamp();
      return await chan.send({ embed }).catch(console.error);
    }
  }
};