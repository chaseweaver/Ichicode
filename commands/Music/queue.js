const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'queue',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['q'],
      permLevel: 0,
      botPerms: ['CONNECT', 'SPEAK'],
      requiredConfigs: [],
      description: 'Lists the music queue.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    try {
      const handler = this.client.queue.get(msg.guild.id);
      if (!handler) return msg.send(`Add some songs to the queue first with ${msg.guild.configs.prefix}add`);

      const output = [];
      for (let i = 0; i < Math.min(handler.songs.length, 15); i++) {
        const tmp = ((i + 1) <= 9) ? `0${i + 1}` : `${i + 1}`;
        output.push(`${tmp}. ${handler.songs[i].title}\nRequested by: ${handler.songs[i].requester}\n`);
      }

      const embed = new msg.client.methods.Embed()
        .setColor('#ff003c')
        .setTitle('Queue')
        .setThumbnail(handler.songs[0].thumbnail)
        .setAuthor(msg.client.user.username, msg.client.user.avatarURL)
        .addField(`Queue [${handler.songs.length}]`, output)
        .setTimestamp();
      msg.sendEmbed(embed).catch(err => this.client.emit('log', err, 'error'));

    } catch (err) { console.log(err); }
  }
};