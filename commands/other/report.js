/* Sends a report to error channel. */

exports.run = async (client, msg, [...issue]) => {
  if (!msg.guild.settings.reportChan) return msg.chan('The report channel is not configured! Bug a mod!');
  const chan = msg.guild.settings.reportChan;
  return chan.send(`${msg.author.tag} / ${msg.author.id}\n${msg.guild.name} / ${msg.guild.id}\n${msg.guild.channel.name} / ${msg.guild.channel.id}\n${new Date()}\`\`\`${issue}\`\`\``)
    .catch(err => console.log(err, `${msg.author.tag} / ${msg.author.id}\n${msg.guild.name} / ${msg.guild.id}\n${msg.guild.channel.name} / ${msg.guild.channel.id}\n${new Date()}\`\`\`${issue}\`\`\``));
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