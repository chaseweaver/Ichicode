/* Events manager for a guild. */

exports.run = async (client, msg, [action, eve, date, time]) => {
  const parseEvent = client.funcs.parseEvent;
  const permissions = client.funcs.permissions;
  const pOne = [];
  const pTwo = [];
  let output = '';
  let ctr = 1;
  let data;
  let padTwo;
  let padOne;

  if (!permissions(client, msg)) action = 'list';

  if (!client.settings.guilds.schema.events) await client.settings.guilds.add('events', { type: 'String', array: true });

  switch (action) {
  case 'add':
    if (!eve) return msg.send('You must provide an event!');
    if (!date) return msg.send('You must provide a date!');
    if (!time) return msg.send('You must provide a time!');
    if (client.settings.guilds.schema['events'].array) {
      await client.settings.guilds.updateArray(msg.guild, 'add', 'events', JSON.stringify(parseEvent(eve, date, time)));
      return msg.send(`Successfully added the event **${eve}** on **${date}** at **${time}**!`);
    }
    break;
  case 'remove':
    if (!eve || eve <= 0 || eve > msg.guild.settings.events.length) return msg.send('You must provide a valid event index!');
    client.settings.guilds.updateArray(msg.guild, 'remove', 'events', msg.guild.settings.events[eve - 1])
      .catch(e => { console.log(e); msg.send(`**${eve}** is not a valid event index!`); });
    data = Object.values(JSON.parse(msg.guild.settings.events[eve - 1]));
    msg.send(`Successfully removed the event **${data[0]}** on **${data[1]}** at **${data[2]}**!`);
    break;
  default:
    output = [`= Upcoming ${msg.guild.name} Events =\n`];
    if (msg.guild.settings.events.length === 0) return msg.send('There are no upcoming events scheduled!');
    for (let i = 0; i < msg.guild.settings.events.length; i++) {
      data = Object.values(JSON.parse(msg.guild.settings.events[i]));
      pOne.push(data[0]);
      pTwo.push(data[1]);
    }
    padOne = pOne.sort((a, b) => a.length < b.length)[0].length;
    padTwo = pTwo.sort((a, b) => a.length < b.length)[0].length;
    for (let i = 0; i < msg.guild.settings.events.length; i++) {
      data = Object.values(JSON.parse(msg.guild.settings.events[i]));
      output.push(`${ctr++} :: ${data[0].padEnd(padOne)}\t${data[1].padEnd(padTwo)}\t${data[2]}`);
    }
    return msg.sendCode('asciidoc', output);
  }
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
  description: 'Lists upcoming guild events.',
  usage: '<add|remove|list> [eve:str] [date:str] [time:str]',
  usageDelim: ' | ',
  extendedHelp: '',
};