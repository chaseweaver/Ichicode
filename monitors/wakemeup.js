const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'wakemeup',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  run(msg) {
    if (msg.content.length >= 50 || msg.content.length <= 5 || msg.author.id === this.client.user.id) return;
    if (msg.content.match(/(\b[wW][aA][kK][eE]\b)/) && msg.content.match(/(\b[uU][pP]\b)/) &&
      msg.content.toUpperCase().startsWith('WAKE')) {
      const str = msg.content.replace(/(\b[wW][aA][kK][eE]\b)/, '');
      const final = str.replace(/(\b[uU][pP]\b)/, '');
      return msg.send(`*Wakes${final}up inside!*`);
    }
  }
};