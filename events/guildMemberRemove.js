const Moment = require('moment');
exports.run = (client, mem) => {

  try {
    /* Send goodbye message if enabled. */
    if (mem.guild.settings.goodbyeMsg && mem.guild.settings.goodbyeMem && mem.guild.settings.goodbyeChan) {
      let build = `Goodbye, ${mem.user.tag}!`;
      const chan = mem.guild.channels.find('id', mem.guild.settings.goodbyeChan);
      const message = mem.guild.settings.goodbyeMsg;
      if (message.search('$USER$')) build = message.replace('$USER$', mem.user);
      chan.send(build).catch(err => console.log(err, 'error'));
    }

    /* Log member removed if enabled. */
    if (mem.guild.settings.logMemRemove && mem.guild.settings.memLogs && mem.guild.settings.memLogs) {
      const chan = mem.guild.channels.find('id', mem.guild.settings.memLogs);
      const avatar = mem.user.displayAvatarURL() ? mem.user.displayAvatarURL() : mem.guild.iconURL();

      const embed = new client.methods.Embed()
        .setColor('#ff003c')
        .setThumbnail(avatar)
        .setAuthor(`${mem.user.tag} / ${mem.user.id}`, avatar)
        .addField('Joined At', `${Moment.utc(mem.joinedTimestamp).format('llll')} UTC-0`)
        .addField('Left At', `${Moment.utc(new Date()).format('llll')} UTC-0`)
        .setTimestamp(new Date());
      chan.send({ embed }).catch(err => console.log(err, 'error'));
    }
  } catch (error) { console.log(error); }

  console.log(`Member ${mem.user.username} left ${mem.guild.name}. Account age ${mem.user.createdAt}.`);
};