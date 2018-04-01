const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'fuckvulp',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  run(msg) {
    if (!msg.guild.configs.fuckMonitor || msg.content.length <= 3) return;
    if (msg.author.id == '198706708560871424' && msg.content.toUpperCase().contains === 'fuck') {
      const data = msg.guild.configs.ctrOne;
      await msg.guild.configs.update('ctrOne', ++data, msg.guild, { avoidUnconfigurable: true, action: 'set' });
      return msg.send(`Vulp \`FUCK\` count: **${++data}**`);
    }
  }
};