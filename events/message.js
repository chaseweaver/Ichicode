exports.run = (client, msg) => {
  // console.log(client.user.id);
  // const attachment = msg.attachments.array();
  // console.log(attachment);
  // console.log(msg.attachments.array().find('attachment'));

  /* Put custom stuff here for tripping */

  /* My own amusment */
  if (msg.author.id === client.config.ownerID && msg.guild.settings.emoji) msg.react('♥');

  try {
    /* This deletes messages that get spammed into chat */
    if (msg.guild.settings.antiSpam && msg.guild.settings.cooldown) {
      if (msg.member.roles.find('name', msg.guild.settings.modRole) ||
        msg.member.roles.find('name', msg.guild.settings.adminRole) ||
        (msg.member.id === client.config.ownerID)) return;
      if (msg.channel.type === 'dm') return;
      const cooldown = msg.guild.settings.cooldown;
      const msgTS = msg.createdTimestamp;
      const data = [];
      msg.channel.messages.fetch({ limit: 15 })
        .then(m => {
          const arr = m.array();
          for (let i = 0; i < arr.length; i++) {
            if (msg.author.id === arr[i].author.id) {data.push(arr[i].createdTimestamp);}
            if (data.length >= 2) return;
          }
        })
        .then(function() {
          const oldTS = data[1];
          if (msgTS <= oldTS + (cooldown * 1000)) msg.delete();
        })
        .catch(console.error);
    }
  } catch (error) { console.log(error); }
};