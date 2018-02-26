/* Returns the guild ID. */

exports.run = async (client, msg) => {
  return msg.channel.send(`${msg.guildgui.name}\`s ID: ${msg.guild.id}`, { code: 'xl' }).catch(err => console.log(err, 'error'));
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