const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'banchase',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  run(msg) { if (msg.content.toUpperCase().includes('BLUEBERRY')) return msg.guild.members.find('id', '205757464807735296').ban('Being mentioned'); }
};