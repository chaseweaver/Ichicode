const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'hijack',
      enabled: false,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: false,
    });
  }

  run(msg) { if (msg.content.includes('https://i.imgur.com/VMoDwC5.gifv')) { msg.delete(); }}
};