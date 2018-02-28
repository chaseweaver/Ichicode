/* Returns server information. */

exports.run = async (client, msg) => {

  console.log(msg.guild.iconURL({ format: 'png' }));

  const avatar = msg.guild.iconURL() ? msg.guild.iconURL() : 'https://imgur.com/ik9S8V5.png';
  const roles = msg.guild.roles.array().length ? msg.guild.roles.array().length : 'N/A';
  const channelCount = msg.guild.channels.array().length ? msg.guild.channels.array().length : 'N/A';
  const guildName = msg.guild.name;
  const guildAcro = msg.guild.nameAcronym;
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

  let verify = msg.guild.verificationLevel;
  if (verify === 0) verify = 'None';
  else if (verify >= 1 && verify <= 3) verify = 'Low';
  else if (verify >= 4 && verify <= 7) verify = 'Medium';
  else if (verify >= 8) verify = 'High';

  const embed = new client.methods.Embed()
    .setColor('#ff003c')
    .setThumbnail(avatar)
    .setAuthor(`[${guildAcro}] ${guildName} / ${guildID}`, avatar)
    .addField(`Total Members [${memberCount}]`, `${onlineCount.size} Online, ${memberCount - onlineCount.size} Offline`)
    .addField('Region', region)
    .addField(`Channels [${channelCount}]`, cctmp)
    .addField(`Roles [${roles}]`, rtmp)
    .addField('Verification Level', verify)
    .addField('Created On', createdAt)
    .addField('Server Owner', `${owner} / ${ownerID}`);
  return await msg.send({ embed }).catch(console.error);
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'server',
  description: 'Returns server info.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};