exports.run = (client, msg) => {
  
  /* Put custom stuff here for tripping */

  /* This deletes messages that get spammed into chat */
  if (msg.channel.type === 'dm') return;
  if (msg.author.bot) return;
  if (!msg.guild.settings.antiSpam || !msg.guild.settings.cooldown) return;
  if (msg.guild.settings.antiSpam && msg.guild.settings.cooldown) {
    const cooldown = msg.guild.settings.cooldown;
    const msgTS = msg.createdTimestamp;
    let data = [];
    msg.channel.fetchMessages({limit: 15})
      .then(m => {
        const arr = m.array();
        for (let i = 0; i < arr.length; i++) {
          if (msg.author.id === arr[i].author.id)
            data.push(arr[i].createdTimestamp);
          if (data.length >= 2) return;
        }
      })
      .then(function() {
        const oldTS = data[1];
        if (msgTS <= oldTS + (cooldown * 1000)) msg.delete();
      })
      .catch(console.error);
  }
};