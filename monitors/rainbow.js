const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'rainbow',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  async run(msg) {
    if (msg.channel.type !== 'text' || !msg.content || !msg.guild.configs.rainbowMonitor || !msg.guild.configs.rainbowRole) return;
    if (Math.floor(Math.random() * 31) !== 0) return;
    const role = msg.guild.configs.rainbowRole;
    const color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    await role.setColor(color);
  }
};