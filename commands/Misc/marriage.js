const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'marriage',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 10,
      botPerms: [],
      requiredConfigs: [],
      description: 'Marriage things.',
      quotedStringSupport: true,
      usage: '<status|marry|divorce> <member:member>',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async init() { return; }
  async run(msg, [action, ...params]) { return this[action](msg, params); }
  async marry(msg, member) { return member; }
  async status(msg, member) { return member; }
  async divorce(msg, member) { return member; }
};