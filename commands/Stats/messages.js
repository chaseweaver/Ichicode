const { Command } = require('klasa');
const Moment = require('moment');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'messages',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: ['READ_MESSAGES', 'SEND_MESSAGES'],
      requiredConfigs: [],
      description: 'Returns message count across channel from potential user/channel.',
      quotedStringSupport: true,
      usage: '<channel:channel> [member:member] [dateOne:str] [dateTwo:str]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [channel, member = null, dateOne, dateTwo]) {
    let start = msg.createdTimestamp;
    let end = start - (1000 * 60 * 60 * 24);
    let count = 0;
    let active = true;
    const timer = Date.now();

    if (!channel) return msg.reply('I couldn\'t find that channel!');
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
        end = channel.createdTimestamp;
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
    if (end < channel.createdTimestamp) end = channel.createdTimestamp;

    /* A nested mess, but is fast and works well. */
    const fetch = (id) => {
      channel.messages.fetch({ limit: 100, before: id })
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
            return active = false;
          }
          if (active === true) fetch(tmpID);
        })
        .then(function() {
          if (!active) {
            let avatar;
            if (member) avatar = member.user.displayAvatarURL();
            else avatar = msg.guild.iconURL();
            const user = member ? member : 'Everyone';
            const embed = new msg.client.methods.Embed()
              .setColor('#ff003c')
              .setTitle('Total Messages')
              .setThumbnail(avatar)
              .setAuthor(`${msg.guild.name} / ${msg.guild.id}`, avatar)
              .addField('Channel', `#${channel.name}`, true)
              .addField('Member', user, true)
              .addField('Time Frame', `${Moment.utc(end).format('llll')} UTC-0 - ${Moment.utc(start).format('llll')} UTC-0`)
              .addField('Message Count', count)
              .addField('Total Processing Time', `${(Date.now() - timer) / 1000}s`, true)
              .addField('Client-Server Ping', `${Math.round(msg.client.ping)}ms`, true)
              .setTimestamp(new Date());
            return msg.send({ embed }).catch(console.error);
          }
        })
        .catch(function(err) { console.log(err); });
    };
    await fetch(msg.id);
  }
};