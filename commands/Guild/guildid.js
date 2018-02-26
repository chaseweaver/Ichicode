exports.run = async (client, msg) => {
  const gui = msg.guild;
  return msg.channel.send(`${gui.name}\`s ID: ${gui.id}`, {code: 'xl'}).catch(err => console.log(err, 'error'));
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
  name: 'guildid',
  description: 'Returns guild ID.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};