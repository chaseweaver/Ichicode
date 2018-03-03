/* Sends a report to error channel. */

exports.run = async (client, msg, [...issue]) => {
  if (!msg.guild.settings.reportChan) return msg.chan('The report channel is not configured! Bug a mod!');
  const chan = msg.guild.channels.find('id', msg.guild.settings.reportChan);
  return chan.send(`${msg.author} / ${msg.guild.id}\n${msg.channel} / ${msg.channel.id}\n${new Date()}\n\n\`\`\`${issue}\`\`\``)
    .catch(err => console.log(err));
};

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 30,
  nsfw: false,
};

exports.help = {
  name: 'report',
  description: 'Sends a report to error channel.',
  usage: '<issue:str>',
  usageDelim: '',
  extendedHelp: '',
};