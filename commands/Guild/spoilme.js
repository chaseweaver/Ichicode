const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'spoilme',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['spoil'],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Removes a spoil role.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: null,
    });
  }

  async run(msg) {
    if (msg.guild.configs.spoilRole) {
      if (!msg.guild.roles.find('id', msg.guild.configs.spoilRole)) return;
      if (!msg.guild.members.find('id', msg.author.id).roles.find('id', msg.guild.configs.spoilRole))
        return msg.send(`You do not have the **${msg.guild.roles.find('id', msg.guild.configs.spoilRole).name}** role! You should be rolling in spoilers!`);
      else return await msg.guild.members.find('id', msg.author.id).roles
        .remove(msg.guild.configs.spoilRole)
        .then(msg.reply(`**${msg.guild.roles.find('id', msg.guild.configs.spoilRole).name}** has been removed from your collection! You are destined for spoilers!`))
        .catch(console.error);
    } else { return; }
  }
};