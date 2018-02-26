exports.run = async (client, msg, [type, status = 'online', ...str]) => {
  str = str.length ? str.join(' ') : null;
  switch (type) {
  case 'status':
    await client.user.setStatus(status);
    return msg.channel.send(`Status changed to ***${status}***`)
      .then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
  case 'watching':
    await client.user.setActivity(str, { type: 'WATCHING' });
    return msg.channel.send(`${str ? `Watching changed to ***${str}***` : 'Watching cleared'}`)
      .then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
  case 'listening':
    await client.user.setActivity(str, { type: 'LISTENING' });
    return msg.channel.send(`${str ? `Listening changed to ***${str}***` : 'Listening cleared'}`)
      .then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
  default:
    await client.user.setGame(str);
    return msg.channel.send(`${str ? `Game changed to ***${str}***` : 'Game cleared'}`)
      .then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2500,
  nsfw: false,
};

exports.help = {
  name: 'presence',
  description: 'Set bot \'presence\'.',
  usage: '<status|game|watching|listening> [online|idle|invisible|dnd] [game:str] [watching:str] [listening:str]',
  usageDelim: ' ',
  extendedHelp: '',
};