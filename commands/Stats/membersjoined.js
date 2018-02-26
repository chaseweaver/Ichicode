const Moment = require('moment');
exports.run = async (client, msg, [dateOne, dateTwo]) => {
  let start = msg.createdTimestamp;
  let end = start - (1000 * 60 * 60 * 24);
  let count = 0;
  let active = true;

  if (dateOne && !dateTwo) {
    start = msg.createdTimestamp;
    if (await new Date(dateOne !== (null || NaN))) end = await new Date(dateOne).getTime();
    switch (dateOne) {
      case 'hourly': 
        end = start - (1000 * 60 * 60);
        break;
      case 'daily': 
        end = start - (1000 * 60 * 60 * 24);
        break;
      case 'weekly': 
        end = start - (1000 * 60 * 60 * 24 * 7);
        break;
      case 'monthly': 
        end = start - (1000 * 60 * 60 * 24 * 30);
        break;
      case 'monthly29': 
        end = start - (1000 * 60 * 60 * 24 * 29);
        break;
      case 'monthly30': 
        end = start - (1000 * 60 * 60 * 24 * 30);
        break;
      case 'monthly31': 
        end = start - (1000 * 60 * 60 * 24 * 31);
        break;
      case 'alltime': 
        end = msg.guild.createdTimestamp;
        break;
    }
  } else if (dateOne && dateTwo) {
    if ((await new Date(dateOne) && await new Date(dateTwo)) !== (null || NaN)) {
      start = await new Date(dateOne).getTime();
      end = await new Date(dateTwo).getTime();
    }
  }

  if ((start || end) === (null || NaN)) return msg.channel.send(`There was an error paring the date!`, {code: 'xl'});
  if (start < end) end = [start, start = end][0];
  if (end < msg.guild.createdTimestamp) end = msg.guild.createdTimestamp;
      
  await msg.guild.members.array().forEach(m => {
    if (m.joinedTimestamp <= start && m.joinedTimestamp >= end) count++;
  });

  let avatar = msg.guild.iconURL;
  if (!avatar) avatar = 'https://imgur.com/ik9S8V5.png';
  const embed = {
    color: 255106,
    title: 'Total Messages',
    author: {
      name: `${msg.guild.name} / ${msg.guild.id}`,
      icon_url: avatar,
    },
    fields: [{
      name: `${Moment(end).format('llll')} - ${Moment(start).format('llll')}`,
      value: `Members joined: ${count}`
    }],
    timestamp: new Date()
  };
  return msg.channel.send({embed}).catch(err => console.log(err, 'error'));
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
  name: 'membersjoined',
  description: 'Returns number of new members.',
  usage: '<dateOne:str> [dateTwo:str]',
  usageDelim: ' ',
  extendedHelp: '',
};