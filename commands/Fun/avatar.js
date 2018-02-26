/* Returns mentioned user profile picture. */

exports.run = async (client, msg) => {
  if (!msg.mentions.users.size) await msg.channel.send(msg.author.avatarURL);
  msg.mentions.users.map(user => { return msg.channel.send(`${user.username}'s avatar: ${user.avatarURL}\n`); });
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