const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'skip',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 0,
      botPerms: ['CONNECT', 'SPEAK'],
      requiredConfigs: [],
      description: 'Skips the current song if you are the one to have requested it.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    try {
      if (!msg.guild.voiceConnection) return msg.send('I am not connected in a voice channel!');
      const handler = this.client.queue.get(msg.guild.id);

      if (!handler) return msg.send(`Add some songs to the queue first with ${msg.guild.configs.prefix}add`);
      if (handler.songs[0].requesterID !== msg.author.id && !msg.member.roles.find('id', msg.guild.configs.musicRole)) return msg.send('You can only skip a song you have added!');
      msg.guild.voiceConnection.dispatcher.end();
      return msg.send('Skipped!');
    } catch (err) { console.log(err); }
  }
};