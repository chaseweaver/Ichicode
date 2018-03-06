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
      /* Send welcome message if enabled. */
      if (mem.guild.configs.welcomeMessgage && mem.guild.configs.welcomeMemberActive && mem.guild.configs.welcomeChannel) {
        if (!mem.guild.configs.welcomeMemberActive) return;
        let build = `Welcome, ${mem.user.tag}!`;
        const chan = mem.guild.channels.find('id', mem.guild.configs.welcomeChannel);
        const message = mem.guild.configs.welcomeMessgage;
        if (message.search('$USER$')) build = message.replace('$USER$', mem.user);
        chan.send(build).catch(err => console.log(err, 'error'));
      }

      /* Log member joined if enabled. */
      if (mem.guild.configs.logMemberAdd && mem.guild.configs.memberLogChannel) {
        const chan = mem.guild.channels.find('id', mem.guild.configs.memberLogChannel);
        const avatar = mem.user.displayAvatarURL() ? mem.user.displayAvatarURL() : mem.guild.iconURL();

        const embed = new this.client.methods.Embed()
          .setColor('#00ffbb')
          .setTitle('Member Joined')
          .setThumbnail(avatar)
          .setAuthor(`${mem.user.tag} / ${mem.user.id}`, avatar)
          .addField('Joined At', `${Moment.utc(mem.joinedTimestamp).format('llll')} UTC-0`)
          .setTimestamp(new Date());
        chan.send({ embed }).catch(err => console.log(err, 'error'));
      }
    } catch (error) { console.log(error); }
    console.log(`Member '${mem.user.tag}' joined '${mem.guild.name}'. Account age '${mem.user.createdAt}'.`);
  }
};