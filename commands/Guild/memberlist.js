const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'memberlist',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: [],
      requiredConfigs: [],
      description: 'Gets the list of members.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    const data = [];
    let ctr = 1;
    data.push(`${msg.guild.name} / ${msg.guild.id} member list:\n`);

    msg.guild.members.array().forEach(mem => {
      if (ctr <= 9) data.push(`0${ctr}. <${mem.user.id}> ${mem.user.username}`);
      else data.push(`${ctr}. <${mem.user.id}> ${mem.user.username}`);
      ctr++;
    });

    await msg.author.send(data, { code: 'xl', split: true })
      .then(() => {if (msg.channel.type !== 'dm') msg.reply('I`ve sent you a DM with the member list!');})
      .catch(() => msg.reply('It seems like I can`t DM you!'));
  }
};