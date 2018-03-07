const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'event',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 10,
      botPerms: [],
      requiredConfigs: [],
      description: 'Lists upcoming guild events.',
      quotedStringSupport: true,
      usage: '<add|remove|list> [event:str] [date:date] [time:str]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async init() { return; }
  async run(msg, [action, eve, date, time]) { return this[action](msg, eve, date, time); }
  async marry(msg, member) { return member; }
  async status(msg, member) { return member; }
  async divorce(msg, member) { return member; }
};