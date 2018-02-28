/* Adds a YouTube 'song' to the queue. */

const ytdl = require('ytdl-core');
const getInfoAsync = require('util').promisify(ytdl.getInfo);

const exp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/\S*(?:(?:\/e(?:mbed)?)?\/|watch\/?\?(?:\S*?&?v=))|youtu\.be\/)([\w-]{11})(?:[^\w-]|$)/;

exports.run = async (client, msg, [song]) => {
  const id = exp.exec(song);
  if (id === null) throw 'You must provide a valid YouTube URL!';
  const info = await getInfoAsync(`https://youtu.be/${id[1]}`);

  if (!client.queue.has(msg.guild.id)) {
    client.queue.set(msg.guild.id, {
      playing: false,
      songs: [],
    });
  }

  client.queue.get(msg.guild.id).songs.push({
    url: song,
    title: info.title,
    seconds: info.length_seconds,
    requester: msg.author.username,
  });

  return msg.send(`Added **${info.title}** to the queue.`);
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
  name: 'add',
  description: 'Adds a song the the queue.',
  usage: '<song:str>',
  usageDelim: '',
  extendedHelp: '',
};

exports.init = (client) => {
  client.queue = new client.methods.Collection();
};