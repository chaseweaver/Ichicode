const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'report',
      enabled: true,
      runIn: ['text'],
      cooldown: 60,
      bucket: 1,
      aliases: ['issue'],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Sends an anonymous message to the mods.',
      quotedStringSupport: true,
      usage: '<message:str>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [...message]) {
    try {
      const chan = msg.guild.configs.reportChannel;
      if (!chan) return;
      const embed = new msg.client.methods.Embed()
        .setColor('#ff003c')
        .addField('Request', message.join(' '))
        .setTimestamp();
      return chan.send({ embed }).then(msg.delete()).catch(err => msg.client.emit('log', err, 'error'));
    } catch (err) { console.log(err); }
  }
};