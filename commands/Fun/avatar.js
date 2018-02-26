/* Returns mentioned user profile picture. */

exports.run = async (client, msg) => {
  if (!msg.mentions.users.size) await msg.send(msg.author.avatarURL);
  msg.mentions.users.map(usr => { return msg.send(`${usr.username}'s avatar: ${usr.avatarURL}\n`); });
};

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['pfp', 'icon'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2500,
  nsfw: false,
};

exports.help = {
  name: 'avatar',
  description: 'Get the avatar URL tagged member(s).',
  usage: '',
  usageDelim: '',
  extendedHelp: '',
};