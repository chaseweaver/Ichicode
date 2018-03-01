/* Returns the member count per given role. */

exports.run = async (client, msg, [role]) => {
  let str = `[${msg.guild.nameAcronym}] ${msg.guild.name}\n\n`;
  let roltmp;
  if (role) roltmp = role.join(' ');
  let found = false;

  if (role) {
    msg.guild.roles.find(rol => {
      if (rol.name === roltmp) {
        str += `> ${rol.name} : ${rol.members.size} members\n`;
        found = true;
      }
    });
    if (!found) return msg.reply('I did not find that role!').catch(err => console.log(err, 'error'));
    return msg.send(str, { code: 'xl' }).catch(err => console.log(err, 'error'));
  } else {
    let itr = 1;
    let plc = '';
    msg.guild.roles.array().forEach(rol => {
      if (rol.members.size <= 9) plc = '   ';
      if (rol.members.size >= 10 && rol.members.size <= 99) plc = '  ';
      if (rol.members.size >= 100 && rol.members.size < 1000) plc = ' ';
      if (itr <= 9) str += `[0${itr}] ${plc}${rol.members.size} | ${rol.name}\n`;
      else str += `[${itr}] ${plc}${rol.members.size} | ${rol.name}\n`;
      itr++;
    });
    return msg.send(str, { code: 'xl' }).catch(err => console.log(err, 'error'));
  }
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['roles'],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'rolemembercount',
  description: 'Gets member count per role.',
  usage: '[role:str]',
  usageDelim: '',
  extendedHelp: '',
};