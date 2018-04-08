const { Command, Timestamp } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'age',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: [],
      requiredConfigs: [],
      description: 'Returns the age of a guild/role/member/channel.',
      quotedStringSupport: true,
      usage: '[member:member] [channel:channel] [role:role] [value:str]',
      usageDelim: '',
      extendedHelp: null,
    });
    this.timestamp = new Timestamp('MM/DD/YYYY [@] HH:mm:ss UTC');
  }

  async run(msg, [member, channel, role, ...value]) {
    
    value = value.length > 0 ? value.join(' ') : null;
    const out = [];
    let type = 'guild';

    if (member) type = 'member';
    else if (channel) type = 'channel';
    else if (role) type = 'role';
    else if (msg.guild.members.find('nickname', value)) type = 'member';
    else if (msg.guild.roles.find('name', value)) type = 'role';
    else if (msg.guild.channels.find('name', value)) type = 'channel';

    else if (msg.guild.members.find('id', value)) type = 'member';
    else if (msg.guild.roles.find('id', value)) type = 'role';
    else if (msg.guild.channels.find('id', value)) type = 'channel';

    switch (type) {
    case 'guild':
      const guildAge = new this.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .setThumbnail(msg.guild.iconURL() ? msg.guild.iconURL() : 'https://imgur.com/ik9S8V5.png')
        .setAuthor(`${msg.guild.name} / ${msg.guild.id}`, msg.guild.iconURL() ? msg.guild.iconURL() : 'https://imgur.com/ik9S8V5.png')
        .addField('Created On', this.timestamp.displayUTC(msg.guild.createdAt))
      return msg.sendEmbed(guildAge).catch(console.error);
    case 'member':
      const memberAge = new this.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL())
        .addField('❯ Member ID', member.id, true)
        .addField('❯ Member Nickname', member.nickname || 'N/A', true)
        .addField('❯ Member Age', this.timestamp.displayUTC(member.user.createdAt), true)
        .addField('❯ Member Joined At', this.timestamp.displayUTC(member.user.joinedAt), true)
      return msg.sendEmbed(memberAge).catch(console.error);
    case 'role':
      const roleAge = new this.client.methods.Embed()
        .setColor(role.hexColor || 0xFFFFFF)
        .addField('❯ Role Name', role, true)
        .addField('❯ Role ID', role.id, true)
        .addField('❯ Creation Date', this.timestamp.displayUTC(role.createdAt), true)
      return msg.sendEmbed(roleAge).catch(console.error);
    case 'channel':
      const channelAge = new this.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .addField('❯ Channel', channel.name, true)
        .addField('❯ Channel ID', channel.id, true)
        .addField('❯ Channel Age', this.timestamp.displayUTC(channel.createdAt))
      return msg.sendEmbed(channelAge).catch(console.error);
    }
  }
};