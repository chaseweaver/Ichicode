const { Event } = require('klasa');
const Moment = require('moment');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'guildMemberAdd',
      enabled: true,
      event: 'guildMemberAdd',
      once: false,
    });
  }

  run(mem) {
    try {
      if (mem.guild.configs.welcomeMessgage && mem.guild.configs.welcomeMemberActive && mem.guild.configs.welcomeChannel) {
        if (!mem.guild.configs.welcomeMemberActive) return;
        let build = `Welcome, ${mem.user.tag}!`;
        const chan = mem.guild.channels.find('id', mem.guild.configs.welcomeChannel);
        const message = mem.guild.configs.welcomeMessgage;
        if (message.search('$MENTION$')) build = message.replace('$MENTION$', mem.user);
        if (message.search('$SERVER$')) build = message.replace('$SERVER$', mem.guild);
        chan.send(build).catch(err => console.log(err, 'error'));
      }

      if (mem.guild.configs.logMemberAdd && mem.guild.configs.memberLogChannel) {
        const memChan = mem.guild.channels.find('id', mem.guild.configs.memberLogChannel);
        if (!memChan) return;
        const avatar = mem.user.displayAvatarURL() ? mem.user.displayAvatarURL() : mem.guild.iconURL();
        const embed = new this.client.methods.Embed()
          .setColor('#00ffbb')
          .setTitle('Member Joined')
          .setThumbnail(avatar)
          .setAuthor(`${mem.user.tag} / ${mem.user.id}`, avatar)
          .addField('Joined At', `${Moment.utc(mem.joinedTimestamp).format('llll')} UTC-0`)
          .setTimestamp();
        memChan.send({ embed }).catch(err => console.log(err, 'error'));
      }
    } catch (error) { console.log(error); }
    console.log(`Member '${mem.user.tag}' joined '${mem.guild.name}'. Account age '${mem.user.createdAt}'.`);
  }
};