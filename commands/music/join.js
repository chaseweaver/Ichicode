/* Joins the message author's voice channel. */

exports.run = async (client, msg) => {
  const { voiceChannel } = msg.member;
  if (!voiceChannel) throw 'You are not conected in a voice channel!';

  const permissions = voiceChannel.permissionsFor(msg.guild.me);
  if (!permissions.has('CONNECT')) throw 'I am missing the \'CONNECT\' permission.';
  if (!permissions.has('SPEAK')) throw 'I am missing the \'SPEAK\' permission.';

  await voiceChannel.join();
  return msg.send(`Connected to the voice channel ${voiceChannel}.`);
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 2,
  botPerms: ['CONNECT', 'SPEAK'],
  requiredFuncs: [],
  cooldown: 2500,
  nsfw: false,
};

exports.help = {
  name: 'join',
  description: 'Joins the author\'s voice channel.',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};