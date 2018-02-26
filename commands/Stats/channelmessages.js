const Moment = require('moment');
exports.run = async (client, msg, [channel, dateOne, dateTwo]) => {
  let start = msg.createdTimestamp;
  let end = start - (1000 * 60 * 60 * 24);
  let count = 0;
  let chan = channel;
  let active = true;

  chan = msg.guild.channels.find('name', channel);
  if (!chan) return msg.channel.send(`I couldn\'t find that channel!`, {code: 'xl'});

  if (channel && dateOne && !dateTwo) {
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
        end = chan.createdTimestamp;
        break;
    }
  } else if (channel && dateOne && dateTwo) {
    if ((await new Date(dateOne) && await new Date(dateTwo)) !== (null || NaN)) {
      start = await new Date(dateOne).getTime();
      end = await new Date(dateTwo).getTime();
    }
  }

  if ((start || end) === (null || NaN)) return msg.channel.send(`There was an error paring the date!`, {code: 'xl'});
  if (start < end) end = [start, start = end][0];
  if (end < chan.createdTimestamp) end = chan.createdTimestamp;

  let fetch = (id, m) => {
    chan.fetchMessages({limit: 100, before: id})
      .then(messages => {
        let arr = messages.array();
        let tmpID;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id !== (undefined || null)) tmpID = arr[i].id; 
          if (arr[i].createdTimestamp <= start && arr[i].createdTimestamp >= end) count++;
          else return active = false;
        }
        if (active === true) fetch(tmpID, m);
      })
      .then(function() {
        if (!active) {
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
              name: 'Channel',
              value: `#${chan.name}`
            }, {
              name: `${Moment(end).format('llll')} - ${Moment(start).format('llll')}`,
              value: `Message Count: ${count}`
            }, {
              name: 'Total Processing Time:',
              value: `${(Date.now() - msg.createdTimestamp) / 1000}s`,
            }],
            timestamp: new Date()
          };
          return m.edit({embed}).catch(console.error);
        }
      })
      .catch(function(err) {console.log(err)})
  }
  await msg.channel.send(`Fetching messages . . .`, {code: 'xl'}).then((m) => {fetch(msg.id, m)});
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
  name: 'channelmessages',
  description: 'Returns message count across channel.',
  usage: '<channel:str> [dateOne:str] [dateTwo:str]',
  usageDelim: ' ',
  extendedHelp: '',
};