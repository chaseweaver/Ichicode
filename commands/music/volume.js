/* Sets the voice connection volume. */

exports.run = async (client, msg, [vol = null]) => {
  if (!msg.guild.voiceConnection) throw 'I am not connected in a voice channel';
  const handler = client.queue.get(msg.guild.id);
  if (!handler || handler.playing === false) throw 'I am not playing music.';

  const { dispatcher } = msg.guild.voiceConnection;

  if (!vol) return msg.send(`Current volume: ${dispatcher.volume * 50}%`);
  if (vol >= 1 && vol <= 200) {
    dispatcher.setVolume(vol / 50);
    return msg.send(`Volume: ${dispatcher.volume * 50}%`);
  }
  return msg.send('Please enter an integer between 1 - 200!');
};

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['vol'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 2,
  nsfw: false,
};

exports.help = {
  name: 'volume',
  description: 'Sets the voice connection volume.',
  usage: '[vol:int]',
  usageDelim: '',
  extendedHelp: '',
};