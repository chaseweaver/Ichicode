const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'remove',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 0,
      botPerms: ['CONNECT', 'SPEAK'],
      requiredConfigs: [],
      description: 'Removes a song you have queued.',
      quotedStringSupport: false,
      usage: '<index:int>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [index]) {
    try {
      if (index <= 0) return msg.send('Please enter a valid index number!');
      const handler = this.client.queue.get(msg.guild.id);
      if (!handler) return msg.send(`Add some songs to the queue first with ${msg.guild.configs.prefix}add`);

      if (index == 1) {
        const id = handler.songs[0];
        if (id.requesterID !== msg.author.id && !msg.member.roles.find('id', msg.guild.configs.musicRole)) return msg.send('You cannot remove items from the queue you did not add!');
        handler.songs.splice(0, 1);
        if (handler.playing) msg.guild.voiceConnection.dispatcher.end();
        return msg.send(`**${id.title}** requested by **${id.requester}** has been removed!`);
      }

      if (!index) {
        const id = handler.songs[handler.songs.length - 1];
        if (id.requesterID !== msg.author.id && !msg.member.roles.find('id', msg.guild.configs.musicRole)) return msg.send('You cannot remove items from the queue you did not add!');
        handler.songs.splice(handler.songs.length - 1, 1);
        return msg.send(`**${id.title}** requested by **${id.requester}** has been removed!`);
      }

      if (handler.songs[index]) {
        const id = handler.songs[index - 1];
        if (id.requesterID !== msg.author.id && !msg.member.roles.find('id', msg.guild.configs.musicRole)) return msg.send('You cannot remove items from the queue you did not add!');
        handler.songs.splice(index - 1, 1);
        return msg.send(`**${id.title}** requested by **${id.requester}** has been removed!`);
      } else { return msg.send('I cannot find that index in the queue!'); }

    } catch (err) { console.log(err); }
  }
};