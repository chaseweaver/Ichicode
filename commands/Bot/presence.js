const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'presence',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: [],
      requiredConfigs: [],
      description: 'Sets the bot\'s presence.',
      quotedStringSupport: true,
      usage: '<status|playing|watching|listening|streaming> [online|idle|invisible|dnd] [playing:str] [watching:str] [listening:str] [streaming:url]',
      usageDelim: ' ',
      extendedHelp: null,
    });
  }

  async run(msg, [type, status = 'online', ...str]) {
    str = str.length > 0 ? str.join(' ') : null;
    switch (type) {
    case 'status':
      await this.client.user.setStatus(status);
      return msg.send(`Status changed to ***${status}***`)
        .catch(console.error);
    case 'watching':
      await this.client.user.setActivity(str, { type: 'WATCHING' });
      return msg.send(`${str ? `Watching changed to ***${str}***` : 'Watching cleared'}`)
        .catch(console.error);
    case 'listening':
      await this.client.user.setActivity(str, { type: 'LISTENING' });
      return msg.send(`${str ? `Listening changed to ***${str}***` : 'Listening cleared'}`)
        .catch(console.error);
    case 'streaming':
      await this.client.user.setActivity(str, { type: 'STREAMING' });
      return msg.send(`${str ? `Streaming changed to ***${str}***` : 'Streaming cleared'}`)
        .catch(console.error);
    default:
      await this.client.user.setActivity(str);
      return msg.send(`${str ? `Game changed to ***${str}***` : 'Game cleared'}`)
        .catch(console.error);
    }
  }
};