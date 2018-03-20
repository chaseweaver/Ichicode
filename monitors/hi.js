const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'hi',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  run(msg) {
    if (msg.content.length > 30 || msg.content.length <= 5 || msg.author.id === this.client.user.id) return;
    if (msg.content.match(/(\b[iI]'?\s*a?[mM]\b)/)) {
      const str = msg.content.replace(/(\b[iI]'?\s*a?[mM]\b)/, '');
      return msg.send(`Hi,${str}, I'm Ichicode!`);
    }
  }
};