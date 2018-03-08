const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'itsatrap',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: false,
    });
  }

  run(msg) {
    if (msg.content.contains('https://i.imgur.com/VMoDwC5.gifv')) {
      const final = msg.content;
      msg.edit(final.replace('https://i.imgur.com/VMoDwC5.gifv', ''));
    }
  }
};