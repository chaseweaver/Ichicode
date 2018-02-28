/* Lists upcomming guild events. */

exports.run = async (client, msg, [event, time]) => {

  console.log(event + time);
  // client.settings.guilds.updateArray(msg.guild, 'add', 'events', [event][time]);

  /*
  const chan = await msg.guild.channels.find('name', channel);
  if (!chan) return msg.send('I cannot find that channel!');
  return chan.send(chat).then(() => msg.delete()).catch(err => console.log(err, 'error'));
  */

};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'events',
  description: 'Lists upcomming guild events.',
  usage: '<event:str> <time:str>',
  usageDelim: ' on ',
  extendedHelp: '',
};