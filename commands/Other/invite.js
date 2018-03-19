<<<<<<< HEAD
/* Intended to override Klasa default. */

=======
>>>>>>> dev
const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'invite',
      enabled: false,
      runIn: ['text'],
<<<<<<< HEAD
      cooldown: 0,
=======
      cooldown: 2,
>>>>>>> dev
      bucket: 1,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredConfigs: [],
<<<<<<< HEAD
      description: 'Not yet available, sorry!',
      quotedStringSupport: true,
=======
      description: 'Not available!',
      quotedStringSupport: false,
>>>>>>> dev
      usage: '',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg) { return; }
};