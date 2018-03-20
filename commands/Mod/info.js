const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'info',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: [],
      requiredConfigs: [],
      description: 'Returns member info.',
      quotedStringSupport: false,
      usage: '[member:member]',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [mem = msg.member]) {
    let rtmp = '';
    let kicks = 0, bans = 0;
    msg.guild.fetchAuditLogs({ user: mem }).then(logs => {
      Array.from(logs.entries.values()).forEach(ele => {
        if (ele.targetType !== 'USER' || !ele.target ||ele.target.id !== mem.id) return;
        else if (ele.action === 'MEMBER_KICK') kicks++;
        else if (ele.action === 'MEMBER_BAN') bans++;
      });
    }).catch(console.error);

    mem.roles.filter(r => rtmp += `\`${r.name}\`\t`);
    const embed = new this.client.methods.Embed()
      .setColor('#00ffbf')
      .setThumbnail(mem.user.displayAvatarURL())
      .setAuthor(`${mem.user.tag} / ${mem.user.id}`, mem.user.displayAvatarURL())
      .addField('Nickname', mem.nickname ? mem.nickname : 'N/A', true)
      .addField('Presence', mem.user.presence.status, true)
      .addField(`Roles [${mem.roles.array().length > 0 ? mem.roles.array().length : 0}]`, rtmp, true)
      .addField('Joined At', mem.joinedAt, true)
      .addField('Account Age', mem.user.createdAt, true)
      .addField('Total Kicks', kicks, true)
      .addField('Total Bans', bans, true)
      // .addField('Last Message Sent Time', mem.lastMessage.createdAt ? mem.lastMessage.createdAt : 'N/A', true)
      // .addField('Last Active Channel', mem.lastMessage.channel ? mem.lastMessage.channel : 'N/A', true)
      .setTimestamp();  
    return await msg.sendEmbed(embed).catch(console.error);
  }
};