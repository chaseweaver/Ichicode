exports.run = async (client, msg, [channel, dateOne, dateTwo]) => {
  let start = msg.createdTimestamp;
  let end = start - (1000 * 60 * 60 * 24);
  let chan = channel;
  let active = true;
  const data = [];
  const exp = 'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+';

  chan = msg.guild.channels.find('name', channel);
  if (!chan) return msg.channel.send('I couldn`t find that channel!', { code: 'xl' });

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
  }
  else if (channel && dateOne && dateTwo) {
    if ((await new Date(dateOne) && await new Date(dateTwo)) !== (null || NaN)) {
      start = await new Date(dateOne).getTime();
      end = await new Date(dateTwo).getTime();
    }
  }

  if ((start || end) === (null || NaN)) return msg.channel.send('There was an error paring the date!', { code: 'xl' });
  if (start < end) end = [start, start = end][0];
  if (end < chan.createdTimestamp) end = chan.createdTimestamp;

  const fetch = (id, m) => {
    chan.fetchMessages({ limit: 100, before: id })
      .then(messages => {
        const arr = messages.array();
        let tmpID;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id !== (undefined || null)) tmpID = arr[i].id;
          if (arr[i].createdTimestamp <= start && arr[i].createdTimestamp >= end) {
            if (arr[i].content.match(exp)) data.push(arr[i].content.match(exp));
          }
          else {return active = false;}
        }
        if (active === true) fetch(tmpID, m);
      })
      .then(function() {
        if (!active) {
          msg.author.send(data, { split: true })
            .then(() => {
              if (msg.channel.type !== 'dm') msg.reply('I`ve sent you a DM with the attachments!', { code: 'xl' });
              m.delete();
            })
            .catch(() => msg.reply('It seems like I can`t DM you!', { code: 'xl' }));
        }
      })
      .catch(function(err) {console.log(err);});
  };
  await msg.channel.send('Fetching attachments . . .', { code: 'xl' }).then((m) => {fetch(msg.id, m);});
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
  name: 'logattachments',
  description: 'Parses and logs URLs in a channel.',
  usage: '<channel:str> [dateOne:str] [dateTwo:str]',
  usageDelim: ' ',
  extendedHelp: '',
};