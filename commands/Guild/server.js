const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'server',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['info'],
      permLevel: 3,
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
    const avatar = msg.guild.iconURL() ? msg.guild.iconURL() : 'https://imgur.com/ik9S8V5.png';
    const roles = msg.guild.roles.array().length > 0 ? msg.guild.roles.array().length : 'N/A';
    const channelCount = msg.guild.channels.array().length > 0 ? msg.guild.channels.array().length : 'N/A';
    const guildName = msg.guild.name;
    const guildID = msg.guild.id;
    const memberCount = msg.guild.memberCount;
    const owner = msg.guild.owner.user.tag;
    const ownerID = msg.guild.ownerID;
    const region = msg.guild.region;
    const createdAt = msg.guild.createdAt;
    const onlineCount = msg.guild.members.filter(m => m.presence.status === 'online');

    let cctmp = '';
    msg.guild.channels.filter(c => cctmp += `\`${c.name}\`\t`);

    let rtmp = '';
    msg.guild.roles.filter(r => rtmp += `\`${r.name}\`\t`);

    const embed = new this.client.methods.Embed()
      .setColor('#ff003c')
      .setThumbnail(avatar)
      .setAuthor(`${guildName} / ${guildID}`, avatar)
      .addField(`Total Members [${memberCount}]`, `${onlineCount.size} Online, ${memberCount - onlineCount.size} Offline`)
      .addField('Region', region)
      .addField(`Channels [${channelCount}]`, cctmp)
      .addField(`Roles [${roles}]`, rtmp)
      .addField('Verification Level', msg.guild.verificationLevel)
      .addField('Created On', createdAt)
      .addField('Server Owner', `${owner} / ${ownerID}`)
      .setTimestamp();
    return await msg.sendEmbed(embed).catch(console.error);
  }
};