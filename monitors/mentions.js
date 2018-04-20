const { Monitor } = require('klasa');
const { masterServer, mentionsChannel } = require('../config.js');

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
    if (msg.channel.type !== 'text' || !msg.content.includes(`<@!${this.client.id}>`)) return;
    try {
      if (!masterServer || !mentionsChannel) return;
      const embed = new msg.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .setAuthor(`${msg.author.tag} / ${msg.author.id}`, msg.author.displayAvatarURL())
        .setThumbnail(msg.author.displayAvatarURL())
        .addField('❯ Guild', `${msg.guild.name} [${msg.guild.memberCount}] / ${msg.guild.id}`)
        .addField('❯ Message', msg.content)
      return this.client.guilds.find('id', masterServer).channels.find('id', mentionsChannel)
        .sendEmbed(embed).catch(err => msg.client.emit('log', err, 'error'));
    } catch (err) { console.log(err); }
  }
};