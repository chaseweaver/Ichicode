exports.run = async (client, msg, [channel]) => {
  let final;
  if (channel) final = msg.guild.channels.find('name', channel);
  else final = msg.guild;
  return await msg.channel.send(`${final.name} / ${final.id}\nCreated on: ${final.createdAt}`, { code: 'xl' }).catch(err => console.log(err, 'error'));
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
  name: 'createdate',
  description: 'Returns date the guild or channel was created.',
  usage: '[channel:str]',
  usageDelim: '',
  extendedHelp: '',
};