/* Events manager for a guild. A hack to keep using the current DB provider. */

exports.run = async (client, msg, [action, eve, date, time]) => {
  let output = '';
  let events;
  let ctr = 1;
  let i1;
  let final = '';
  const key = 'events';
  const plc = Math.floor(Math.random() * 90) + 10;
  if (!client.settings.guilds.schema.events) await client.settings.guilds.add(key, { type: 'String', array: true });

  switch (action) {
  case 'add':
    if (!eve) return msg.send('You must provide an event!');
    if (!date) return msg.send('You must provide a date!');
    if (!time) return msg.send('You must provide a time!');

    final = `${plc}${eve}___${date}___${time}`;

    if (client.settings.guilds.schema[key].array) {
      await client.settings.guilds.updateArray(msg.guild, 'add', key, final);
      return msg.send(`Successfully added the event **${eve}** on **${date}** at **${time}**!`);
    }
    break;
  case 'remove':
    if (!eve || eve <= 0 || eve >= msg.guild.settings.events.length) return msg.send('You must provide a valid event index!');
    client.settings.guilds.updateArray(msg.guild, 'remove', key, msg.guild.settings.events[eve - 1])
      .catch(e => { console.log(e); msg.send(`**${eve}** is not a valid event index!`); });
    final = msg.guild.settings.events[eve - 1].split('___').join('\t');
    msg.send(`Successfully removed the event **${final}**!`);
    break;
  default:
    output = [`= Upcoming ${msg.guild.name} Events =\n`];
    events = msg.guild.settings.events;
    if (events.length === 0) return msg.send('There are no upcoming events scheduled!');
    for (let i = 0; i < events.length; i++) {
      i1 = msg.guild.settings.events[i].splasplit('___').join('\t');
      output.push(`${ctr++} :: ${i1}`);
    }
    return msg.sendCode('asciidoc', output);
  }
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 10,
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