const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'botnickname',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 10,
      botPerms: ['CHANGE_NICKNAME'],
      requiredConfigs: [],
      description: 'Sets the bot\'s nickname.',
      quotedStringSupport: true,
      usage: '[nickname:str]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [nick = '']) {
    const bot = msg.guild.members.get(this.client.user.id);
    await bot.setNickname(nick);
    const text = nick.length > 0 ? `Nickname changed to ${nick}` : 'Nickname Cleared';
    return msg.send(text).then(m => m.delete(5000)).then(() => msg.delete()).catch(console.error);
  }
};