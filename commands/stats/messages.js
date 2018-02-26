/* Fetches the message count within a channel from potential user. */

const Moment = require('moment');
exports.run = async (client, msg, [channel, member = null, dateOne, dateTwo]) => {
  let start = msg.createdTimestamp;
  let end = start - (1000 * 60 * 60 * 24);
  let count = 0;
  let chan = channel;
  let active = true;

  chan = msg.guild.channels.find('name', channel);
  if (!chan) return msg.reply('I couldn\'t find that channel!');

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

  if ((start || end) === (null || NaN)) return msg.reply('There was an error paring the date!');
  if (start < end) end = [start, start = end][0];
  if (end < chan.createdTimestamp) end = chan.createdTimestamp;

  /* A nested mess, but is fast and works well. */
  const fetch = (id, m) => {
    chan.messages.fetch({ limit: 100, before: id })
      .then(messages => {
        const arr = messages.array();
        let tmpID;
        try {
          if (!member && arr[arr.length - 1].createdTimestamp <= start && arr[arr.length - 1].createdTimestamp >= end) {
            count += arr.length;
            tmpID = arr[arr.length - 1].id;
          } else {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].id !== (undefined || null)) tmpID = arr[i].id;
              if (arr[i].createdTimestamp <= start && arr[i].createdTimestamp >= end) {
                if (member && arr[i].author.id === member.id) count++;
                else if (!member) count++;
              } else { return active = false; }
            }
          }
        } catch (error) {
          console.log(error);
          return active = false;
        }
        if (active === true) fetch(tmpID, m);
      })
      .then(function() {
        if (!active) {
          let avatar;
          if (member) avatar = member.user.displayAvatarURL();
          else avatar = msg.guild.iconURL();
          const user = member ? member : 'Everyone';
          const embed = new client.methods.Embed()
            .setColor('#ff003c')
            .setTitle('Total Messages')
            .setThumbnail(avatar)
            .setAuthor(`${msg.guild.name} / ${msg.guild.id}`, avatar)
            .addField('Channel', `#${chan.name}`, true)
            .addField('Member', user, true)
            .addField('Time Frame', `${Moment(end).format('llll')} - ${Moment(start).format('llll')}`)
            .addField('Message Count', count)
            .addField('Total Processing Time', `${(Date.now() - msg.createdTimestamp) / 1000}s`, true)
            .addField('Client-Server Ping', `${Math.round(client.ping)}ms`, true)
            .setTimestamp(new Date());
          return m.edit({ embed }).catch(console.error);
        }
      })
      .catch(function(err) { console.log(err); });
  };
  await msg.send('Fetching messages . . .').then((m) => { fetch(msg.id, m); });
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
  name: 'messages',
  description: 'Returns message count across channel from potential user.',
  usage: '<channel:str> [member:member] [dateOne:str] [dateTwo:str]',
  usageDelim: ' ',
  extendedHelp: '',
};