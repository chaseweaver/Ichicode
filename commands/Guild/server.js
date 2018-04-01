const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'server',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['guild'],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Returns server info.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    switch (msg.guild.verificationLevel) {
      case 0: const lvl = 'None: Unrestricted';
      case 1: const lvl = 'Low : Must have a verified email on their Discord account.';
      case 2: const lvl = 'Medium : Must have a verified email on their Discord account and also be registered on Discord for longer than 5 minutes.';
      case 3: const lvl = '(╯°□°）╯︵ ┻━┻ : Must have a verified email on their Discord account, be registered on Discord for longer than 5 minutes, and be a member of this server for longer than 10 minutes.';
      case 4: const lvl = ' ┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻ : Must have a verified email on their Discord account, be registered on Discord for longer than 5 minutes, be a member of this server for longer than 10 minutes, and have a verified phone attached to their Discord account.';
    }

    const embed = new this.client.methods.Embed()
      .setColor('#ff003c')
      .setThumbnail(msg.guild.iconURL() ? msg.guild.iconURL() : 'https://imgur.com/ik9S8V5.png')
      .setAuthor(`${msg.guild.name} / ${msg.guild.id}`,
        msg.guild.iconURL() ? msg.guild.iconURL() : 'https://imgur.com/ik9S8V5.png')
      .addField(`Total Members [${msg.guild.memberCount}]`,
        `${msg.guild.members.filter(m => m.presence.status === 'online').size} Online, ${msg.guild.memberCount - msg.guild.members.filter(m => m.presence.status === 'online').size} Offline`, true)
      .addField('Region', msg.guild.region, true)
      .addField(`Channels [${msg.guild.channels.array().length > 0 ? msg.guild.channels.array().length : '0'}]`, `For channel list, run \`${msg.guild.configs.prefix}channels\``)
      .addField(`Roles [${msg.guild.roles.array().length > 0 ? msg.guild.roles.array().length : '0'}]`, `For role list, run \`${msg.guild.configs.prefix}roles\``)
      .addField(`Verification Level [${msg.guild.verificationLevel}]`, lvl)
      .addField('Created On', msg.guild.createdAt)
      .addField('Server Owner', `${msg.guild.owner.user.tag} / ${msg.guild.ownerID}`)
      .setTimestamp();
    return await msg.sendEmbed(embed).catch(console.error);
  }
};