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
      permLevel: 5,
      botPerms: [],
      requiredConfigs: [],
      description: 'Adds birthday role to a member for 24 hours.',
      quotedStringSupport: false,
      usage: '<member:member>',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(msg, [mem]){
    if (!msg.guild.configs.birthdayRole) return msg.send('The birthday role is not set! Please set it in Guild configs!');
    const role = msg.guild.configs.birthdayRole;
    await mem.roles.add(role).catch(error => console.log(error));
    const birthday = await this.client.schedule.create('removeBirthday', Date.now() + (1000 * 60 * 60 * 24), {
			data: {
				member: mem,
				role: role
      },
			catchUp: true
    });
    return msg.send(`\`${role.name}\` has been added to \`${mem.user.tag}\``);
  }
};