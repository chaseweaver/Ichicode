const Moment = require('moment');
exports.run = (client, mem) => {
  if (!mem.guild.settings.logMemAdd) return;
  if (!mem.guild.settings.memLogs) return;

  const chan = mem.guild.channels.find('id', mem.guild.settings.memLogs);
  if(!chan) return;

  let avaURL = mem.user.avatarURL;
  if (!avaURL) avaURL = mem.user.defaultAvatarURL;

  const embed = {
    color: 65407,
    title: 'Member Joined',
    author: {
      name: `${mem.user.tag} / ${mem.user.id}`,
      icon_url: avaURL,
    },
    fields: [{
      name: `Joined At`,
      value: Moment(mem.joinedTimestamp).format('llll'),
    }],
    timestamp: new Date()
  };

  chan.send({embed}).catch(err => console.log(err, 'error'));
  console.log(`Member ${mem.name} joined ${mem.guild.name}.`);
};