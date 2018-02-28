/* DMs a list of members. */

exports.run = async (client, msg) => {
  const data = [];
  let ctr = 1;

  data.push(`[${msg.guild.nameAcronym}] ${msg.guild.name} member list:\n`);
  msg.guild.members.array().forEach(mem => {
    if (ctr <= 9) data.push(`0${ctr}. <${mem.user.id}> ${mem.user.username}`);
    else data.push(`${ctr}. <${mem.user.id}> ${mem.user.username}`);
    ctr++;
  });

  await msg.author.send(data, { code: 'xl', split: true })
    .then(() => {if (msg.channel.type !== 'dm') msg.reply('I`ve sent you a DM with the member list!');})
    .catch(() => msg.reply('It seems like I can`t DM you!'));
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'memberlist',
  description: 'Gets the list of members.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};