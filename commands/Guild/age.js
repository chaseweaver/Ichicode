const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'age',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 3,
      botPerms: [],
      requiredConfigs: [],
      description: 'Returns the created date of a guild/user/role/channel.',
      quotedStringSupport: true,
      usage: '<guild|member|user|role|channel> [member:member] [user:member] [value:str]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [type, member, ...value]) {
    value = value.length > 0 ? value.join(' ') : null;
    let final;
    switch (type) {
    case 'guild':
      return msg.send(`${msg.guild.name} / ${msg.guild.id} / ${msg.guild.createdAt}`, { code: 'xl' })
        .catch(err => console.log(err, 'error'));
    case 'member':
      if (member) {
        return msg.send(`@${member.user.username} / ${member.id} / ${member.user.createdAt}`, { code: 'xl' })
          .catch(err => console.log(err, 'error'));
      } else { return msg.send('Invalid name!'); }
    case 'user':
      if (member) {
        return msg.send(`@${member.user.username} / ${member.id} / ${member.user.createdAt}`, { code: 'xl' })
          .catch(err => console.log(err, 'error'));
      } else { return msg.send('Invalid name!'); }
    case 'role':
      if (!value) return msg.send('Invalid name!');
      if (msg.guild.roles.find('name', value)) {
        final = msg.guild.roles.find('name', value);
        return msg.send(`${final.name} / ${final.id} / ${final.createdAt}`, { code: 'xl' })
          .catch(err => console.log(err, 'error'));
      }
      break;
    case 'channel':
      if (msg.guild.channels.find('name', value)) {
        final = msg.guild.channels.find('name', value);
        return msg.send(`#${final.name} / ${final.id} / ${final.createdAt}`, { code: 'xl' })
          .catch(err => console.log(err, 'error'));
      } else { if (!value) return msg.send('Invalid name!'); }
      break;
    default:
      return msg.send(`I cannot find the created date of \`${value}\``)
        .catch(err => console.log(err, 'error'));
    }
  }
};