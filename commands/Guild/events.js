const { Command } = require('klasa');
const Moment = require('moment');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'events',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['event'],
      permLevel: 10,
      botPerms: [],
      requiredConfigs: [],
      description: 'Lists upcoming guild events.',
      quotedStringSupport: true,
      usage: '[add|remove|list] [event:str] [date:str] [time:str]',
      usageDelim: ' ',
      extendedHelp: 'Date format: MM-DD-YYY | Time format: 00:00:00',
    });
  }

  async run(msg, [action = 'list', event, date, time]) { return this[action](msg, event, date, time); }

  async add(msg, event, date, time) {
    if (!event || !date || !time) return msg.send('Missing argument!');
    if (!await Moment(date).isValid()) return msg.send('Invalid date!');
    if (!await Moment(date + ' ' + time).isValid()) return msg.send('Invalid time!');

    const fixedDate = await Moment(date).format('LL');
    const { errors, updated } = await msg.guild.configs.update('events', JSON.stringify({ 'event': event, 'date': fixedDate, 'time': time }),
      msg.guild, { avoidUnconfigurable: true, action: 'add' });

    if (errors.length) return msg.sendMessage(errors[0]);
    if (!updated.length) return msg.sendMessage('Cannot add that event!');
    return msg.send(`Successfully added the event **${event}** on **${fixedDate}** at **${time}**!`);
  }

  async remove(msg, index) {
    if (!index || index <= 0 || index > msg.guild.configs.events.length) return msg.send('You must provide a valid event index!');

    const data = Object.values(JSON.parse(msg.guild.configs.events[index - 1]));
    await msg.guild.configs.update('events', msg.guild.configs.events[index - 1], msg.guild, { avoidUnconfigurable: true, action: 'remove' })
      .catch(e => { console.log(e); msg.send(`**${index}** is not a valid event index!`); });
    msg.send(`Successfully removed the event **${data[0]}** on **${data[1]}** at **${data[2]}**!`);
  }

  async list(msg) {
    const pOne = [];
    const pTwo = [];
    const pThree = [];
    let output = '';
    let ctr = 1;
    let data;

    if (msg.guild.configs.events.length === 0) return msg.send('There are no upcoming events scheduled!');

    for (let i = 0; i < msg.guild.configs.events.length; i++) {
      data = Object.values(JSON.parse(msg.guild.configs.events[i]));
      pOne.push(data[0]);
      pTwo.push(data[1]);
      pThree.push(data[2]);
    }

    const padOne = pOne.sort((a, b) => a.length < b.length)[0].length;
    const padTwo = pTwo.sort((a, b) => a.length < b.length)[0].length;
    const padThree = pThree.sort((a, b) => a.length < b.length)[0].length;

    output = [`= Upcoming ${msg.guild.name} Events (UTC-0 TIMEZONE) =\n`];
    output.push(`\t ${String('Event').padEnd(padOne)}\t${String('Date').padEnd(padTwo)}\t${String('Time').padEnd(padThree)}\t${String('Remaining Time')}\n`);

    for (let i = 0; i < msg.guild.configs.events.length; i++) {
      data = Object.values(JSON.parse(msg.guild.configs.events[i]));
      console.log(await Moment(`${data[1]} ${data[2]}`).unix() - await Moment().unix());
      if ((await Moment(`${data[1]} ${data[2]}`).unix() - await Moment().unix()) <= 0) {
        await msg.guild.configs.update('events', msg.guild.configs.events[i], msg.guild,
          { avoidUnconfigurable: true, action: 'remove' }).catch(e => { console.log(e); });
      } else {
        const fixedTs = await this.diff(Moment().unix(), Moment(`${data[1]} ${data[2]}`).unix());
        output.push(`${ctr++} :: ${data[0].padEnd(padOne)}\t${data[1].padEnd(padTwo)}\t${data[2].padEnd(padThree)}\t${fixedTs} remaining`);
      }
    }

    return msg.sendCode('asciidoc', output);
  }

  async diff(t1, t2) {
    t1 *= 1000; t2 *= 1000;
    let d, h, m, s;
    s = Math.floor((t2 - t1) / 1000);
    m = Math.floor(s / 60);
    h = Math.floor(m / 60);
    m %= 60;
    d = Math.floor(h / 24);
    h %= 24;
    return `${d} days ${h} hours ${m} mins`
  }
};