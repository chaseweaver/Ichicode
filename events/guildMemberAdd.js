const Moment = require('moment');
exports.run = (client, mem) => {

  try {
    /* Send welcome message if enabled. */
    if (mem.guild.settings.welcomeMsg && mem.guild.settings.welcomeMem && mem.guild.settings.welcomeChan) {
      if (!mem.guild.settings.welcomeMem) return;
      let build = `Welcome, ${mem.user.tag}!`;
      const chan = mem.guild.channels.find('id', mem.guild.settings.welcomeChan);
      const message = mem.guild.settings.welcomeMsg;
      if (message.search('$USER$')) build = message.replace('$USER$', mem.user);
      chan.send(build).catch(err => console.log(err, 'error'));
    }

    /* Log member joined if enabled. */
    if (mem.guild.settings.logMemAdd && mem.guild.settings.memLogs) {
      const chan = mem.guild.channels.find('id', mem.guild.settings.memLogs);
      const avatar = mem.user.displayAvatarURL() ? mem.user.displayAvatarURL() : mem.guild.iconURL();

      const embed = new client.methods.Embed()
        .setColor('#00ffbb')
        .setThumbnail(avatar)
        .setAuthor(`${mem.user.tag} / ${mem.user.id}`, avatar)
        .addField('Joined At', `${Moment.utc(mem.joinedTimestamp).format('llll')} UTC-0`)
        .setTimestamp(new Date());
      chan.send({ embed }).catch(err => console.log(err, 'error'));
    }
  } catch (error) { console.log(error); }

  console.log(`Member '${mem.user.tag}' joined '${mem.guild.name}'. Account age '${mem.user.createdAt}'.`);
};