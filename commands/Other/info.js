/* Intended to override Klasa default. */

const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'info',
      enabled: false,
      runIn: ['text'],
      cooldown: 0,
      bucket: 1,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
      description: 'Not yet available, sorry!',
      quotedStringSupport: true,
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) { return; }
};