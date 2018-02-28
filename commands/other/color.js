/* Returns a link to show a color. */

exports.run = async (client, msg, [hex]) => {
  return msg.send(`https://dummyimage.com/256x256/${hex}/${hex}.jpg`).catch(err => console.log(err, 'error'));
};

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'color',
  description: 'Displays a hex color.',
  usage: '<hex:str>',
  usageDelim: '',
  extendedHelp: '',
};