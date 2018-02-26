/* Returns member count for a given role. */

exports.run = async (client, msg, [role]) => {
  let str = `[${msg.guild.nameAcronym}] ${msg.guild.name}\n\n`;
  let found = false;
  msg.guild.roles.array().forEach(e => {
    if (e.name === role) {
      str += `${e.name}: ${e.members.size} members\n`;
      found = true;
    }
  });
  if (!found) str += 'Role is either invalid or missing!';
  return msg.channel.send(str, { code: 'xl' }).catch(err => console.log(err, 'error'));
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2500,
  nsfw: false,
};

exports.help = {
  name: 'rolecount',
  description: 'Returns member count in a role.',
  usage: '<role:str>',
  usageDelim: '',
  extendedHelp: '',
};