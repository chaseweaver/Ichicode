/* Returns the ID of a guild/member/role/channel. */

exports.run = async (client, msg, [type, member, ...value]) => {
  value = value.length ? value.join(' ') : null;
  let final;
  switch (type) {
  case 'guild':
    return msg.send(`${msg.guild.name} / ${msg.guild.id}`, { code: 'xl' })
      .catch(err => console.log(err, 'error'));
  case 'member':
    if (member) {
      return msg.send(`@${member.user.username} / ${member.id}`, { code: 'xl' })
        .catch(err => console.log(err, 'error'));
    }
    break;
  case 'role':
    if (msg.guild.roles.find('name', value)) {
      final = msg.guild.roles.find('name', value);
      return msg.send(`${final.name} / ${final.id}`, { code: 'xl' })
        .catch(err => console.log(err, 'error'));
    }
    break;
  case 'channel':
    if (msg.guild.channels.find('name', value)) {
      final = msg.guild.channels.find('name', value);
      return msg.send(`#${final.name} / ${final.id}`, { code: 'xl' })
        .catch(err => console.log(err, 'error'));
    }
    break;
  default:
    return msg.send(`I cannot find the ID of \`${value}\``)
      .catch(err => console.log(err, 'error'));
  }
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
  name: 'id',
  description: 'Returns ID.',
  usage: '<guild|member|role|channel> [member:member] [value:str]',
  usageDelim: ' ',
  extendedHelp: '',
};