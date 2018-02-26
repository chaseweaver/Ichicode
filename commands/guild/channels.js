/* Returns a listing of guild channels. */

exports.run = async (client, msg) => {
  let str = `[${msg.guild.nameAcronym}] ${msg.guild.name} channels:\n\n`;
  let num = 1;
  msg.guild.channels.array().forEach(e => {
    str += `${num}. #${e.name}\n`;
    num++;
  });
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
  name: 'channels',
  description: 'Lists guild channels.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};