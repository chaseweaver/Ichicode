const { Command, util: { toTitleCase, codeBlock } } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'birthday',
      enabled: true,
      runIn: ['text'],
      cooldown: 10,
      bucket: 1,
      aliases: ['bday'],
      permLevel: 10,
      botPerms: [],
      requiredConfigs: [],
      description: 'Add / Remove a birthday from a user',
      quotedStringSupport: true,
      usage: '<add|remove|list> (member:member)',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [action, ...params]) { return this[action](msg, params); }

  async add(msg, [mem]) {
    if (!msg.guild.configs.birthdayRole) return msg.send('The birthday role is not set! Please set it in Guild configs!');
    const bdayRole = msg.guild.configs.birthdayRole;
    // if (mem.roles.find('name', bdayRole.name)) return msg.send(`${mem.user.username} already has that role!`);

    // await msg.guild.birthdays.update('users', mem.id, msg.guild, { avoidUnconfigurable: true, action: 'remove' });

    // const { piece } =
    // msg.guild.configs.update('roles.administrator', '339943234405007361', msg.guild);
    // msg.guild.configs.birthdays.update('users', 'this is not a user', msg.guild);
    const modRole = await this.provider.get('users', this.guild.id);
    console.log(modRole);
    console.log(this.client.gateways.birthdays.getPath('users', { avoidUnconfigurable: true, piece: true }));
    // return msg.sendMessage(msg.language.get('COMMAND_CONF_GET', piece.path, msg.author.configs.resolveString(msg, piece)));

    // await mem.roles.add(bdayRole)
    // .catch(error => msg.reply(`I couldn't add ${bdayRole.name} to ${mem.user.username} because of : ${error}`));
    // console.log(this.client.gateways.birthdays.schema.users);
    // await this.client.gateways.birthdays.schema.add(msg.id, { type: 'String' });
    // JSON.stringify({ member: mem.id, timestamp: msg.createdTimestamp }));
    /*
    if (this.client.gateways.birthdays.schema['users'].array) {
      await this.client.gateways.birthdays.updateArray(
        msg.guild, 'add', 'users', JSON.stringify({ member: mem.id, timestamp: msg.createdTimestamp }));
    }
    */
    // msg.send(`**${bdayRole.name}** has been added to **${mem.user.tag}**.`).then(msg.delete(5000));
  }

  async remove(msg, [mem]) {
    if (!msg.guild.configs.birthdayRole) return msg.send('The birthday role is not set! Please set it in Guild configs!');
    if (!mem) return msg.send('I couldn\'t find that member!');
    const bdayRole = msg.guild.configs.birthdayRole;
    if (mem.roles.find('name', bdayRole.name)) return msg.send(`${mem.user.username} doesn't have that role!`);
    await mem.roles.remove(bdayRole)
      .catch(error => msg.reply(`I couldn't remove ${bdayRole.name} from ${mem.user.username} because of : ${error}`));
    msg.send(`**${bdayRole.name}** has been removed from **${mem.user.tag}**.`).then(msg.delete(5000));
  }

  async list(msg) {
    /*
    const { piece } = this.client.gateways.birthdays.getPath(msg.guild.id, { avoidUnconfigurable: true, piece: false });
    return msg.sendMessage(msg.language.get('COMMAND_CONF_USER', key ? `: ${key.split('.').map(toTitleCase).join('/')}` : '',
      codeBlock('asciidoc', msg.author.configs.list(msg, piece))));
    */
  }

  get provider() { this.client.providers.get('json'); }
};