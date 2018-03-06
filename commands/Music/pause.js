const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'pause',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Pauses the currently playing song.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    try {
      if (!msg.guild.voiceConnection) return msg.send('I am not connected in a voice channel!');
      if (msg.guild.voiceConnection.dispatcher.paused) return msg.send('The stream is already paused.');
      const handler = this.client.queue.get(msg.guild.id);
      if (!handler) return msg.send(`Add some songs to the queue first with ${msg.guild.configs.prefix}add`);
      if (handler.songs[0].requesterID !== msg.author.id && !msg.member.roles.find('id', msg.guild.configs.musicRole)) return msg.send('You can only pause a song you have added!');
      msg.guild.voiceConnection.dispatcher.pause();
      return msg.send('Paused!');
    } catch (err) { console.log(err); }
  }
};