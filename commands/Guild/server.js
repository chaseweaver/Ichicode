exports.run = async (client, msg) => {

  let guildAvatar = msg.guild.iconURL;
  if (!guildAvatar) guildAvatar = 'https://imgur.com/ik9S8V5.png';

  let roles;
  if (msg.guild.roles.array().length !== (null || NaN)) {roles = msg.guild.roles.array().length;}

  let channelCount;
  if (msg.guild.channels.array().length !== (null || NaN)) {channelCount = msg.guild.channels.array().length;}

  const guildName = msg.guild.name;
  const guildAcro = msg.guild.nameAcronym;
  const guildID = msg.guild.id;
  const memberCount = msg.guild.memberCount;
  const owner = msg.guild.owner.user.tag;
  const ownerID = msg.guild.ownerID;
  const region = msg.guild.region;
  const createdAt = msg.guild.createdAt;
  const defaultRole = msg.guild.defaultRole.name;
  const defaultRoleID = msg.guild.defaultRole.id;

  let cctmp = '';
  msg.guild.channels.filter(c => cctmp += `${c.name}\t`);

  let rtmp = '';
  msg.guild.roles.filter(r => rtmp += `${r.name}\t`);

  const onlineCount = msg.guild.members.filter(m => m.presence.status === 'online');

  let verify = msg.guild.verificationLevel;
  if (verify === 0) verify = 'None';
  else if (verify >= 1 && verify <= 3) verify = 'Low';
  else if (verify >= 4 && verify <= 7) verify = 'Medium';
  else if (verify >= 8) verify = 'High';

  let avatar = msg.guild.iconURL;
  if (!avatar) avatar = 'https://imgur.com/ik9S8V5.png';

  const embed = {
    color: 255106,
    thumbnail: { url: guildAvatar },
    author: {
      name: `[${guildAcro}] ${guildName} / ${guildID}`,
      icon_url: guildAvatar,
    },
    fields: [{
      name: `Total Members [${memberCount}]`,
      value: `${onlineCount.size} Online, ${memberCount - onlineCount.size} Offline`,
    }, {
      name: 'Region',
      value: region,
    }, {
      name: `Channels [${channelCount}]`,
      value: cctmp,
    }, {
      name: `Roles [${roles}]`,
      value: rtmp,
    }, {
      name: 'Verification Level',
      value: verify,
    }, {
      name: 'Default Role',
      value: defaultRole,
    }, {
      name: 'Default Role ID',
      value: defaultRoleID,
    }, {
      name: 'Created On',
      value: createdAt,
    }, {
      name: 'Server Owner',
      value: `${owner} / ${ownerID}`,
    }],
    timestamp: new Date(),
  };
  return await msg.channel.send({ embed }).catch(console.error);
};
exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2500,
  nsfw: false,
};

exports.help = {
  name: 'server',
  description: 'Returns server info.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};