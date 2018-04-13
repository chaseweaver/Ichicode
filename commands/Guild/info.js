const { Command, Timestamp } = require('klasa');

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
      description: 'Returns the info of a guild/role/member/channel.',
      quotedStringSupport: true,
      usage: '[member:member] [channel:channel] [role:role] [value:str]',
      usageDelim: '',
      extendedHelp: null,
    });
    this.perms = {
      ADMINISTRATOR: 'Administrator',
      VIEW_AUDIT_LOG: 'View Audit Log',
      MANAGE_GUILD: 'Manage Server',
      MANAGE_ROLES: 'Manage Roles',
      MANAGE_CHANNELS: 'Manage Channels',
      KICK_MEMBERS: 'Kick Members',
      BAN_MEMBERS: 'Ban Members',
      CREATE_INSTANT_INVITE: 'Create Instant Invite',
      CHANGE_NICKNAME: 'Change Nickname',
      MANAGE_NICKNAMES: 'Manage Nicknames',
      MANAGE_EMOJIS: 'Manage Emojis',
      MANAGE_WEBHOOKS: 'Manage Webhooks',
      VIEW_CHANNEL: 'Read Text Channels and See Voice Channels',
      SEND_MESSAGES: 'Send Messages',
      SEND_TTS_MESSAGES: 'Send TTS Messages',
      MANAGE_MESSAGES: 'Manage Messages',
      EMBED_LINKS: 'Embed Links',
      ATTACH_FILES: 'Attach Files',
      READ_MESSAGE_HISTORY: 'Read Message History',
      MENTION_EVERYONE: 'Mention Everyone',
      USE_EXTERNAL_EMOJIS: 'Use External Emojis',
      ADD_REACTIONS: 'Add Reactions',
      CONNECT: 'Connect',
      SPEAK: 'Speak',
      MUTE_MEMBERS: 'Mute Members',
      DEAFEN_MEMBERS: 'Deafen Members',
      MOVE_MEMBERS: 'Move Members',
      USE_VAD: 'Use Voice Activity',
    };
    this.timestamp = new Timestamp('MM/DD/YYYY [@] HH:mm:ss UTC');
  }

  async run(msg, [member, channel, role, ...value]) {
    
    value = value.length > 0 ? value.join(' ') : null;
    const out = [];
    let type = 'info';

    if (member) type = 'member';
    else if (channel) type = 'channel';
    else if (role) type = 'role';
    else if (msg.guild.members.find('nickname', value) || msg.guild.members.find('id', value)) type = 'member';
    else if (msg.guild.roles.find('name', value) || msg.guild.roles.find('id', value)) type = 'role';
    else if (msg.guild.channels.find('name', value) || msg.guild.channels.find('id', value)) type = 'channel';
    else return;

    switch (type) {
    case 'member':
      if (!member) member = msg.guild.member.find('name', value) || msg.guild.member.find('id', value);
      const allRoles = member.roles.map(role => role).join(' | ');
      const memberInfo = new this.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL())
        .addField('❯ Member ID', member.id, true)
        .addField('❯ Member Nickname', member.nickname || 'N/A', true)
        .addField('❯ Member Status', (member.presence.activity.name || member.presence.status) || 'N/A', true)
        .addField('❯ Member Age', this.timestamp.displayUTC(member.user.createdAt), true)
        .addField('❯ Member Joined At', this.timestamp.displayUTC(member.user.joinedAt), true)
        .addField('❯ Member Roles', allRoles)
      return msg.sendEmbed(memberInfo).catch(console.error);
    case 'role':
      if (!role) role = msg.guild.roles.find('name', value) || msg.guild.roles.find('id', value);
      const allPermissions = Object.entries(role.permissions.serialize()).filter(perm => perm[1]).map(([perm]) => this.perms[perm]).join(' | ');
      const roleInfo = new this.client.methods.Embed()
        .setColor(role.hexColor || 0xFFFFFF)
        .addField('❯ Role Name', role, true)
        .addField('❯ Role ID', role.id, true)
        .addField('❯ Color', role.hexColor || 'None', true)
        .addField('❯ Hoisted', role.hoist ? 'Yes' : 'No', true)
        .addField('❯ Mentionable', role.mentionable ? 'Yes' : 'No', true)
        .addField('❯ Members With Role', msg.guild.roles.get(role.id).members.size, true)
        .addField('❯ Creation Date', this.timestamp.displayUTC(role.createdAt), true)
        .addField('❯ Permissions', allPermissions);
      return msg.sendEmbed(roleInfo).catch(console.error);
    case 'channel':
      if (!channel) channel = msg.guild.channels.find('name', value) || msg.guild.channels.find('id', value);
      const channelInfo = new this.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .addField('❯ Channel', channel.name, true)
        .addField('❯ Channel ID', channel.id, true)
        .addField('❯ Channel Type', channel.type, true)
        .addField('❯ Channel Position', `Local: ${channel.position + 1} / Global: ${channel.rawPosition + 1}`, true)
        .addField('❯ Channel Age', this.timestamp.displayUTC(channel.createdAt))
      return msg.sendEmbed(channelInfo).catch(console.error);
    default:
      let lvl = 'N/A';
      if (msg.guild.verificationLevel == 0) lvl = 'None: Unrestricted';
      else if (msg.guild.verificationLevel == 1) lvl = 'Low : Must have a verified email on their Discord account.';
      else if (msg.guild.verificationLevel == 2) lvl = 'Medium : Must have a verified email on their Discord account and also be registered on Discord for longer than 5 minutes.';
      else if (msg.guild.verificationLevel == 3) lvl = '(╯°□°）╯︵ ┻━┻ : Must have a verified email on their Discord account, be registered on Discord for longer than 5 minutes, and be a member of this server for longer than 10 minutes.';
      else if (msg.guild.verificationLevel == 4) lvl = ' ┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻ : Must have a verified email on their Discord account, be registered on Discord for longer than 5 minutes, be a member of this server for longer than 10 minutes, and have a verified phone attached to their Discord account.';
      const guildInfo = new this.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .setThumbnail(msg.guild.iconURL() ? msg.guild.iconURL() : 'https://imgur.com/ik9S8V5.png')
        .setAuthor(`${msg.guild.name} / ${msg.guild.id}`,
          msg.guild.iconURL() ? msg.guild.iconURL() : 'https://imgur.com/ik9S8V5.png')
        .addField(`Total Members [${msg.guild.memberCount}]`,
          `${msg.guild.members.filter(m => m.presence.status === 'online').size} Online, ${msg.guild.memberCount - msg.guild.members.filter(m => m.presence.status === 'online').size} Offline`, true)
        .addField('❯ Region', msg.guild.region, true)
        .addField(`❯ Channels [${msg.guild.channels.array().length > 0 ? msg.guild.channels.array().length : '0'}]`, `For channel list, run \`${msg.guild.configs.prefix}channels\``)
        .addField(`❯ Roles [${msg.guild.roles.array().length > 0 ? msg.guild.roles.array().length : '0'}]`, `For role list, run \`${msg.guild.configs.prefix}roles\``)
        .addField(`❯ Verification Level [${msg.guild.verificationLevel}]`, lvl)
        .addField('❯ Created On', this.timestamp.displayUTC(msg.guild.createdAt))
        .addField('❯ Server Owner', `${msg.guild.owner.user.tag} / ${msg.guild.ownerID}`)
      return msg.sendEmbed(guildInfo).catch(console.error);
    }
  }
};