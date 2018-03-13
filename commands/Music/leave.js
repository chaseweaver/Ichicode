const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'leave',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 0,
      botPerms: ['CONNECT', 'SPEAK'],
      requiredConfigs: [],
      description: 'Leaves the bots\'s current voice channel.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) {
    try {
      if (voiceChannel.members.size > 1 || !msg.member.roles.find('id', msg.guild.configs.musicRole)) return;
      const { voiceChannel } = this.client.user;
      if (!voiceChannel) return msg.send('The bot is not in a voice channel!');
      await voiceChannel.leave();
      return msg.send(`Left ${voiceChannel}.`).then(() => msg.delete());
    } catch (err) { console.log(err); }
  }
};