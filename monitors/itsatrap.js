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

  run(msg) { if (msg.content.toLowerCase().replace(/(?:^|\W)[tT][rR][aA][pP](?:$|\W)/g)) { msg.send('<@158348884685357057>');} }
};