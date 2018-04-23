const { Monitor, Timestamp } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'logger',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: false,
    });
    this.timestamp = new Timestamp('MM/DD/YYYY [@] HH:mm:ss UTC');
  }

  run(msg) {
    if (msg.channel.type !== 'text' || !msg.guild.configs.logger || !msg.guild.configs.loggerContent || !msg.guild.configs.loggerChannel) return;
    const arr = msg.guild.configs.loggerContent;

    const chan = msg.guild.channels.find('id', msg.guild.configs.loggerChannel);
    if (!chan) return;
    
    let member = '';
    let channel = '';
    let content = '';
    let active = false;
    let time = msg.createdAt;

    arr.some(a => {
      if (msg.content.toUpperCase().includes(a.toUpperCase() + ' ') ||
          msg.content.toUpperCase().includes(' ' + a.toUpperCase()) ||
          msg.content.toUpperCase().includes(' ' + a.toUpperCase() + ' ') ||
          msg.content.toUpperCase().startsWith(a.toUpperCase()) ||
          msg.content.toUpperCase().endsWith(a.toUpperCase())) {
        member = msg.author;
        channel = msg.channel;
        content = msg.content;
        return active = true;
      }
    });

    if (active) {
      const embed = new this.client.methods.Embed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .setAuthor(`${member.tag} / ${member.id}`, member.displayAvatarURL())
        .setThumbnail(member.displayAvatarURL())
        .addField('❯ Channel', channel, true)
        .addField('❯ Time', this.timestamp.displayUTC(time), true)
        .addField('❯ Content', content);
      return chan.send({ embed }).catch(console.error);
    } else { return };
  }
};