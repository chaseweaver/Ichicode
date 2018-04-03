const { Command } = require('klasa');

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
      description: 'Returns the created date of a guild/role/member/channel.',
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
    this.timestamp = new Timestamp('MMMM dd YYYY');
  }

  async run(msg, [member, channel, role, ...value]) {
    value = value.length > 0 ? value.join(' ') : null;
    const out = [];
    let type = '';

    if (member) type = 'member';
    else if (channel) type = 'channel';
    else if (role) type = 'role';
    else if (msg.guild.members.find('nickname', value)) type = 'member';
    else if (msg.guild.roles.find('name', value)) type = 'role';
    else if (msg.guild.channels.find('name', value)) type = 'channel';

    switch (type) {
    case 'guild':
      out.push('Guild     :: ' + msg.guild.name);
      out.push('Guild ID  :: ' + msg.guild.id);
      out.push('Guild Age :: ' + msg.guild.createdAt);
      break;
    case 'member':
      if (member) {
        out.push('Member     :: ' + member.user.tag);
        out.push('Member ID  :: ' + member.id);
        out.push('Member Age :: ' + member.user.createdAt);
        out.push('Joined At  :: ' + member.user.joinedAt);
      } else if (msg.guild.members.find('nickname', value)) {
        const final = msg.guild.members.find('nickname', value);
        out.push('Member     :: ' + final.user.tag);
        out.push('Member ID  :: ' + final.id);
        out.push('Member Age :: ' + final.user.createdAt);
        out.push('Joined At  :: ' + final.user.joinedAt);
      } else { return msg.send('Invalid name!'); }
      break;
    case 'role':
      if (!role) role = msg.guild.roles.find('name', value);
      const allPermissions = Object.entries(role.permissions.serialize()).filter(perm => perm[1]).map(([perm]) => this.perms[perm]).join(' | ');
      const roleInfo = new this.client.methods.Embed()
        .setColor(role.hexColor || 0xFFFFFF)
        .addField('❯ Name', role.name, true)
        .addField('❯ ID', role.id, true)
        .addField('❯ Color', role.hexColor || 'None', true)
        .addField('❯ Creation Date', new Timestamp('MMMM dd YYYY').display(role.createdAt), true)
        .addField('❯ Hoisted', role.hoist ? 'Yes' : 'No', true)
        .addField('❯ Raw Position', role.rawPossition, true)
        .addField('❯ Mentionable', role.mentionable ? 'Yes' : 'No', true)
        .addField('❯ Permissions', allPermissions);
      return msg.sendEmbed(roleInfo);
    case 'channel':
      if (channel) {
        out.push('Channel     :: ' + channel.name);
        out.push('Channel ID  :: ' + channel.id);
        out.push('Channel Age :: ' + channel.createdAt);
      } else if (msg.guild.channels.find('name', value)) {
        const final = msg.guild.channels.find('name', value);
        out.push('Channel     :: ' + final.name);
        out.push('Channel ID  :: ' + final.id);
        out.push('Channel Age :: ' + final.createdAt);
      } else { return msg.send('Invalid name!'); }
      break;
    default:
      return msg.send(`I cannot find \`${value}\``)
        .catch(err => console.log(err, 'error'));
    }
    if (!out) return;
    else return msg.send(out, { code: 'asciidoc' });
  }
};