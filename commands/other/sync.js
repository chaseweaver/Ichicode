exports.run = async (client, msg, [user]) => {
  const random = Math.floor(Math.random(msg.author.id + user) * 101);
  return msg.channel.send(`${msg.author.username} has a compatability of ${random}% with ${user.tag}`, { code: 'xl' }).catch(err => client.funcs.log(err, 'error'));
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['ship'],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2.5,
};

exports.help = {
  name: 'sync',
  description: 'Show compatibility between users.',
  usage: '<user:user>',
  usageDelim: '',
  extendedHelp: '',
};