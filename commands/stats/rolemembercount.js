/* Returns the member count per given role. */

exports.run = async (client, msg, role) => {
  let str = `[${msg.guild.nameAcronym}] ${msg.guild.name}\n\n`;
  const roltmp = role.join(' ');
  let found = false;
  msg.guild.roles.find(rol => {
    if (rol.name === roltmp) {
      str += `> ${rol.name} : ${rol.members.size} members\n`;
      found = true;
    }
  });
  if (!found) return msg.reply('I did not find that role!').catch(err => console.log(err, 'error'));
  return msg.send(str, { code: 'xl' }).catch(err => console.log(err, 'error'));
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
  name: 'rolemembercount',
  description: 'Gets member count per role.',
  usage: '<role:str>',
  usageDelim: '',
  extendedHelp: '',
};