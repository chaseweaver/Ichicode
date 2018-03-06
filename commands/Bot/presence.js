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
      permLevel: 10,
      botPerms: [],
      requiredConfigs: [],
      description: 'Sets the bot\'s presence.',
      quotedStringSupport: true,
      usage: '<status|game|watching|listening> [online|idle|invisible|dnd] [game:str] [watching:str] [listening:str]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [type, status = 'online', ...str]) {
    str = str.length > 0 ? str.join(' ') : null;
    if (str.length < 4) {
      return msg.send('Requires a char length of 5+!')
        .then(m => m.delete(5000).then(() => msg.delete()).catch(console.error));
    }
    switch (type) {
    case 'status':
      await this.client.user.setStatus(status);
      return msg.send(`Status changed to ***${status}***`)
        .then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
    case 'watching':
      await this.client.user.setActivity(str, { type: 'WATCHING' });
      return msg.send(`${str ? `Watching changed to ***${str}***` : 'Watching cleared'}`)
        .then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
    case 'listening':
      await this.client.user.setActivity(str, { type: 'LISTENING' });
      return msg.send(`${str ? `Listening changed to ***${str}***` : 'Listening cleared'}`)
        .then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
    default:
      await this.client.user.setActivity(str);
      return msg.send(`${str ? `Game changed to ***${str}***` : 'Game cleared'}`)
        .then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
    }
  }
};