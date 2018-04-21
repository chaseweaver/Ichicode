const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'despoil',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['nospoil'],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Adds a spoil role.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: null,
    });
  }

  async run(msg) {
    if (msg.guild.configs.spoilRole) {
      if (!msg.guild.roles.find('id', msg.guild.configs.spoilRole)) return;
      if (msg.guild.members.find('id', msg.author.id).roles.find('id', msg.guild.configs.spoilRole))
        return msg.send(`You already have the **${msg.guild.roles.find('id', msg.guild.configs.spoilRole).name}** role! No spoilers here!`);
      else return await msg.guild.members.find('id', msg.author.id).roles
        .add(msg.guild.configs.spoilRole)
        .then(msg.reply(`**${msg.guild.roles.find('id', msg.guild.configs.spoilRole).name}** has been added to your collection! You are (potentially) spoiler free!`))
        .catch(console.error);
    } else { return; }
  }
};