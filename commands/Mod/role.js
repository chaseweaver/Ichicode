const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'role',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: ['MANAGE_ROLES'],
      requiredConfigs: [],
      description: 'Adds / Removes a role from a user.',
      quotedStringSupport: true,
      usage: '<add|remove> <role:str> <member:member>',
      usageDelim: ' ',
      extendedHelp: 'Logs a report in channel \'memLogChannel\' if set and with \'logRoleChange\' enabled.',
    });
  }

  async run(msg, [action, role, mem]) {
    if (!msg.guild.roles.find('name', role)) return msg.send('I couldn\'t find that role!');
    if (!mem) return msg.send('I couldn\'t find that member!');
    const rol = msg.guild.roles.find('name', role);

    switch (action) {
    case 'add':
      if (mem.roles.find('name', role)) return msg.send(`${mem.user.username} already has that role!`);
      await mem.roles.add(rol)
        .catch(error => msg.reply(`I couldn't add ${rol.name} to ${mem.user.username} because of : ${error}`));
      msg.send(`**${rol.name}** has been added to **${mem.user.tag}**.`).then(msg.delete(5000));
      break;
    case 'remove':
      if (!mem.roles.find('name', role)) return msg.send(`${mem.user.username} doesn't have that role!`);
      await mem.roles.remove(rol)
        .catch(error => msg.reply(`I couldn't remove ${rol.name} to ${mem.user.tag} because of : ${error}`));
      msg.send(`**${rol.name}** has been removed from **${mem.user.tag}**.`).then(msg.delete(5000));
    }

    if (msg.guild.configs.logRoleChange && msg.guild.configs.memberLogChannel) {
      const embed = new this.client.methods.Embed()
        .setColor('#faff00')
        .setTitle(`Role ${action}`)
        .setThumbnail(mem.user.displayAvatarURL)
        .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL)
        .addField('Member', `${mem.user.tag} / ${mem.user.id}`)
        .addField('Role', rol.name)
        .setTimestamp();
      return await msg.guild.configs.memberLogChannel.send({ embed }).catch(console.error);
    }
  }
};