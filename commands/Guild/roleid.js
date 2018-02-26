exports.run = async (client, msg, [role]) => {
  const rol = await msg.guild.roles.find('name', role);
  if (!rol) return msg.channel.send(`I cannot find that role!`, { code: 'xl' });
  return msg.channel.send(`${rol.name}\`s ID: ${rol.id}`, { code: 'xl' }).catch(err => console.log(err, 'error'));
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
  name: 'roleid',
  description: 'Returns role ID.',
  usage: '<role:str>',
  usageDelim: '',
  extendedHelp: '',
};