const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'fool',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 5,
      botPerms: [],
      requiredConfigs: [],
      description: 'April Fools 1up',
      quotedStringSupport: false,
      usage: '<apply|restore|backup>',
      usageDelim: '',
      extendedHelp: '',
    });
  }

  async run(msg, action) { return this[action](msg); }

  async apply(msg) {
    await msg.guild.roles.forEach(e => {
      if (e.id == '417909635782279178') e.edit({ name: 'Birthday_SHIT', color: '#99FF33' });            // Like A Sibling
    });

    await msg.guild.channels.forEach(e => {
      if (e.id == '417909635782279178') e.edit({ name: 'Birthday_SHIT', color: '#277ecd' });            // Like A Sibling
    });
  }

  async restore(msg) {
    await msg.guild.roles.forEach(e => {
      if (e.id == '429489148789784577') e.edit({ name: 'Birthday', color: '#00ffff' });                 // Birthday
      if (e.id == '428429459541065728') e.edit({ name: 'Black Like My Soul', color: '#000001' });       // Black Like My Soul
      if (e.id == '428056923028324362') e.edit({ name: 'Trap God', color: '#e91e63' });                 // Trap God
    });
  }

  async backup(msg) {
    const out = [];
    out.push('ROLES');
    await msg.guild.roles.forEach(e => { out.push(e.name + ' : ' + e.hexColor); });
    out.push(' ');
    out.push('CATEGORIES - TEXT');
    await msg.guild.channels.forEach(e => { if (e.type === 'text') out.push(e.name); });
    out.push(' ');
    out.push('CATEGORIES - CATEGORY');
    await msg.guild.channels.forEach(e => { if (e.type === 'category') out.push(e.name); });
    return msg.author.send(out, { split: true, code: 'txt' });
  }
};