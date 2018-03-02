/* Events manager for a guild. */

exports.run = async (client, msg, [action, eve, date, time]) => {
  const parseEvent = client.funcs.parseEvent;
  let output = '';
  let final = '';
  let events;
  let ctr = 1;
  let longest = 0;
  const data = [];
  let tmp;
  const key = 'events';
  const plc = Math.floor(Math.random() * 90) + 10;
  if (!client.settings.guilds.schema.events) await client.settings.guilds.add(key, { type: 'String', array: true });

  switch (action) {
  case 'add':
    if (!eve) return msg.send('You must provide an event!');
    if (!date) return msg.send('You must provide a date!');
    if (!time) return msg.send('You must provide a time!');

    final = JSON.stringify(parseEvent(eve, date, time));
    
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

    final = msg.guild.settings.events;

    tmp = Object.values(JSON.parse(final[0]));// .map(function(k) { return final[k]; });

    console.log(tmp);
    output.push(tmp);
    // tmp.results.map(function(obj) { console.log(obj['event']); });
    // console.log(tmp);
    // output.push(data);

    /*
    for (let i = 0; i < events.length; i++) {
      tmp = msg.guild.settings.events[i].substring(2).split('___');
      for (let j = 0; j < 3; j++) { data[i] = `${ctr++} :: ${tmp[i + j]}\t${tmp[i + j]}\t${data[i + j]}\t`; }
    }
    */

    /*
    for (let i = 0; i < data.length; i++) {
      longest = data.sort(function(a, b) { return b.length - a.length; })[0];
      output.push(`${ctr++} :: ${data}\n`);//i][0]}\t${data[i][1]}\t${data[i][2]}\t`);
    }
    */

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
  usage: '[add|remove|list] [eve:str] [date:str] [time:str]',
  usageDelim: ' | ',
  extendedHelp: '',
};