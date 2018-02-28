/* Sets the presense of the bot as read by Discord. */

exports.run = async (client, msg, [type, status = 'online', ...str]) => {
  str = str.length ? str.join(' ') : null;
  switch (type) {
  case 'status':
    await client.user.setStatus(status);
    return msg.send(`Status changed to ***${status}***`)
      .then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
  case 'watching':
    await client.user.setActivity(str, { type: 'WATCHING' });
    return msg.send(`${str ? `Watching changed to ***${str}***` : 'Watching cleared'}`)
      .then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
  case 'listening':
    await client.user.setActivity(str, { type: 'LISTENING' });
    return msg.send(`${str ? `Listening changed to ***${str}***` : 'Listening cleared'}`)
      .then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
  default:
    await client.user.setActivity(str);
    return msg.send(`${str ? `Game changed to ***${str}***` : 'Game cleared'}`)
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
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'presence',
  description: 'Sets bot \'presence\'.',
  usage: '<status|game|watching|listening> [online|idle|invisible|dnd] [game:str] [watching:str] [listening:str]',
  usageDelim: ' ',
  extendedHelp: '',
};