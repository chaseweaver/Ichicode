const { Event } = require('klasa');
const Moment = require('moment');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'guildMemberRemove',
      enabled: true,
      event: 'guildMemberRemove',
      once: false,
    });
  }

  run(mem) {
    try {
      /* Send goodbye message if enabled. */
      if (mem.guild.configs.goodbyeMessgage && mem.guild.configs.goodbyeMemberActive && mem.guild.configs.goodbyeChannel) {
        if (!mem.guild.configs.goodbyeMemberActive) return;
        let build = `Welcome, ${mem.user.tag}!`;
        const chan = mem.guild.channels.find('id', mem.guild.configs.goodbyeChannel);
        const message = mem.guild.configs.goodbyeMessage;
        if (message.search('$USER$')) build = message.replace('$USER$', mem.user);
        chan.send(build).catch(err => console.log(err, 'error'));
      }

      /* Log member removed if enabled. */
      if (mem.guild.configs.logMemberRemove && mem.guild.configs.memberLogChannel) {
        const chan = mem.guild.channels.find('id', mem.guild.configs.memberLogChannel);
        const avatar = mem.user.displayAvatarURL() ? mem.user.displayAvatarURL() : mem.guild.iconURL();

        const embed = new this.client.methods.Embed()
          .setColor('#ff003c')
          .setTitle('Member Left')
          .setThumbnail(avatar)
          .setAuthor(`${mem.user.tag} / ${mem.user.id}`, avatar)
          .addField('Joined At', `${Moment.utc(mem.joinedTimestamp).format('llll')} UTC-0`)
          .addField('Left At', `${Moment.utc(new Date()).format('llll')} UTC-0`)
          .addField('Account Age', `${Moment.utc(mem.user.createdAt).format('llll')} UTC-0`)
          .setTimestamp(new Date());
        chan.send({ embed }).catch(err => console.log(err, 'error'));
      }
    } catch (error) { console.log(error); }
    console.log(`Member '${mem.user.tag}' left '${mem.guild.name}'. Account age '${mem.user.createdAt}'.`);
  }
};