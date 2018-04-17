const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'guildfeedback',
      enabled: true,
      runIn: ['text'],
      cooldown: 60,
      bucket: 1,
      aliases: ['gfeed', 'gfeedback'],
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
      const chan = msg.guild.configs.guildFeedbackChannel;
      if (!chan) return;
      const embed = new msg.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .addField('Feedback', message.length > 0 ? message : message.join(' '))
        .setTimestamp();
      return msg.guild.channels.find('id', chan).sendEmbed(embed)
        .then(msg.delete())
        .catch(err => msg.client.emit('log', err, 'error'));
    } catch (err) { console.log(err); }
  }
};