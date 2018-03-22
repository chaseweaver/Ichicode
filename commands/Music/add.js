const { Command } = require('klasa');
const { ytkey } = require('../../config.js');
const snekfetch = require('snekfetch');
const yt = require('ytdl-core');
const getInfo = require('util').promisify(yt.getInfo);
const moment = require('moment');
require('moment-duration-format');
const fetchURL = url => snekfetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${url}&key=${ytkey}`)
  .then(result => result.body);

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'add',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Adds a song to queue from YouTube URL or search term.',
      quotedStringSupport: true,
      usage: '[song:string]',
      usageDelim: '',
      extendedHelp: 'Fetches song by YouTube URL or returns first search parameter, or an uploaded music file.',
    });
    this.exp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/\S*(?:(?:\/e(?:mbed)?)?\/|watch\/?\?(?:\S*?&?v=))|youtu\.be\/)([\w-]{11})(?:[^\w-]|$)/;
  }

  async init() { this.client.queue = new this.client.methods.Collection(); }

  async run(msg, [song]) {
    try {
      if (!song) return msg.send('Either a YouTube URL, ID, search parameter, or file upload is required!');
      if (msg.attachments.array().length !== 0) {
        const ata = await JSON.stringify(msg.attachments);
        const final = await JSON.parse(ata);

        if (!final[0].url.endsWith('.mp3' || '.wav' || '.flac')) return msg.send('That is not a valid file format! Only .MP3 or .WAV!');
        if (!msg.client.queue.has(msg.guild.id)) {
          msg.client.queue.set(msg.guild.id, {
            playing: false,
            songs: [],
          });
        }

        msg.client.queue.get(msg.guild.id).songs.push({
          url: final[0].url,
          title: final[0].url.substring(final[0].url.lastIndexOf('/') + 1, final[0].url.length),
          seconds: 'N/A',
          length: 'N/A',
          thumbnail: 'https://imgur.com/wrf4jkP.png',
          requester: msg.author.username,
          requesterID: msg.author.id,
          upload: true,
        });
        return msg.send('Attachment uploaded to queue!');

      } else {
        const id = await this.getURL(song);
        if (id === null) throw 'You must provide a valid YouTube URL!';
        const info = await getInfo(id);

        if (!msg.client.queue.has(msg.guild.id)) {
          msg.client.queue.set(msg.guild.id, {
            playing: false,
            songs: [],
          });
        }

        msg.client.queue.get(msg.guild.id).songs.push({
          url: info.video_url,
          title: info.title,
          seconds: info.length_seconds,
          length: await moment.duration(info.length_seconds * 1000).format('h:mm:ss', { trim: true }),
          thumbnail: info.thumbnail_url,
          requester: msg.author.username,
          requesterID: msg.author.id,
          upload: false,
        });

        const handler = this.client.queue.get(msg.guild.id);
        let total = 0, totalTime = 0;
        for (let i = 0; i < Math.min(handler.songs.length); i++) { total += parseInt(handler.songs[i].seconds); }
        if (handler.songs.length == 1) total = 'NOW';
        else if (handler.songs.length > 1 && msg.guild.voiceConnection && handler.playing) total -= parseInt(((handler.songs[0].seconds * 1000) - msg.guild.voiceConnection.dispatcher.streamTime));
        totalTime = (total === 'NOW' ? 'NOW' : await moment.duration(total).format('h:mm:ss', { trim: true }));

        const embed = new this.client.methods.Embed()
          .setColor('#ff003c')
          .setTitle(info.title)
          .setThumbnail(info.thumbnail_url)
          .setAuthor(msg.author.username, msg.author.displayAvatarURL())
          .addField('Length', await moment.duration(info.length_seconds * 1000).format('h:mm:ss', { trim: true }), true)
          .addField('Position in Queue', msg.client.queue.get(msg.guild.id).songs.length, true)
          .addField('Estimated Time Until Playing', totalTime, true)
          .setURL(info.video_url)
          .setTimestamp();
        return msg.sendEmbed(embed).catch(err => this.client.emit('log', err, 'error'));
      }
    } catch (err) { console.log(err); }
  }

  async getURL(song) {
    const id = this.exp.exec(song);
    if (id) return `https://youtu.be/${id[1]}`;
    const data = await fetchURL(encodeURIComponent(song));
    console.log(data);
    const video = data.items.find(item => item.id.kind !== 'youtube#channel');
    return video ? `https://youtu.be/${video.id.videoId}` : null;
  }
};