const { Monitor } = require('klasa');
const { masterServer, dmChannel } = require('../config.js');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'botdms',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  run(msg) {
    if (msg.channel.type !== 'dm') return;
    try {
      if (!masterServer || !dmChannel) return;
      const embed = new msg.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .setAuthor(`${msg.member.user.tag} / ${msg.member.user.id}`, msg.member.user.displayAvatarURL())
        .setThumbnail(msg.member.user.displayAvatarURL())
        .addField('Message', msg.content)
        .setTimestamp();
      return this.client.guilds.find('id', masterServer).channels.find('id', dmChannel)
        .sendEmbed(embed).catch(err => msg.client.emit('log', err, 'error'));
    } catch (err) { console.log(err); }
  }
};