
const { KlasaClient } = require('klasa');
const { master, token } = require('./config.js');

KlasaClient.defaultPermissionLevels
  .add(0, () => true)
  .add(2, (client, msg) => {
    // Dev + Mod + Admin + Ext + Music
    if (!msg.guild || !msg.guild.configs.adminRole || !msg.guild.configs.modRole || !msg.guild.configs.devRole || !msg.guild.configs.extRole || !msg.guild.configs.musicRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.configs.adminRole);
    const modRole = msg.guild.roles.get(msg.guild.configs.modRoles);
    const devRole = msg.guild.roles.get(msg.guild.configs.devRole);
    const extRole = msg.guild.roles.get(msg.guild.configs.extRole);
    const musicRole = msg.guild.roles.get(msg.guild.configs.musicRole);
    return ((adminRole && msg.member.roles.has(adminRole.id)) || (modRole && msg.member.roles.has(modRole.id))
    || (devRole && msg.member.roles.has(devRole.id)) || (extRole && msg.member.roles.has(extRole.id)) || (musicRole && msg.member.roles.has(musicRole.id)) || msg.author.id === client.user.id);
  })
  .add(3, (client, msg) => {
    // Dev + Mod + Admin + Ext
    if (!msg.guild || !msg.guild.configs.adminRole || !msg.guild.configs.modRole || !msg.guild.configs.devRole || !msg.guild.configs.extRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.configs.adminRole);
    const modRole = msg.guild.roles.get(msg.guild.configs.modRoles);
    const devRole = msg.guild.roles.get(msg.guild.configs.devRole);
    const extRole = msg.guild.roles.get(msg.guild.configs.extRole);
    return ((adminRole && msg.member.roles.has(adminRole.id)) || (modRole && msg.member.roles.has(modRole.id))
    || (devRole && msg.member.roles.has(devRole.id)) || (extRole && msg.member.roles.has(extRole.id)) || msg.author.id === client.user.id);
  })
  .add(4, (client, msg) => {
    // Dev + Mod + Admin
    if (!msg.guild || !msg.guild.configs.adminRole || !msg.guild.configs.modRole || !msg.guild.configs.devRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.configs.adminsRole);
    const modRole = msg.guild.roles.get(msg.guild.configs.modRoles);
    const devRole = msg.guild.roles.get(msg.guild.configs.devRole);
    return ((adminRole && msg.member.roles.has(adminRole.id)) || (modRole && msg.member.roles.has(modRole.id))
    || (devRole && msg.member.roles.has(devRole.id)) || msg.author.id === client.user.id);
  })
  .add(5, (client, msg) => {
    // Mod + Admin
    if (!msg.guild || !msg.guild.configs.adminRole || !msg.guild.configs.modRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.configs.adminRole);
    const modRole = msg.guild.roles.get(msg.guild.configs.modRoles);
    return ((adminRole && msg.member.roles.has(adminRole.id))
    || (modRole && msg.member.roles.has(modRole.id)) || msg.author.id === client.user.id);
  })
  .add(6, (client, msg) => {
    // Admin
    if (!msg.guild || !msg.guild.configs.adminRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.configs.adminRole);
    return ((adminRole && msg.member.roles.has(adminRole.id) || msg.author.id === client.user.id));
  })
  // Guild Owner
  .add(7, (client, msg) => msg.guild && msg.author.id === msg.guild.owner.id)
  .add(9, (client, msg) => msg.author.id === master)
  .add(10, (client, msg) => msg.author.id === master);

const client = new KlasaClient({
  ownerID : master,
  prefix: '+',
  cmdDeleting: true,
  cmdEditing: true,
  cmdLogging: true,
  cmdPrompt: true,
  ignoreSelf: false,
  typing: true,
  commandMessageLifetime: 60,
  readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
});

client.gateways.register('birthdays', {
  'users': {
    'type': 'String',
    'default': [],
    'array': true,
    'configurable': true,
    'sql': 'TEXT',
  },
});

client.gateways.register('events', {
  'event': {
    'type': 'String',
    'default': [],
    'array': true,
    'configurable': true,
    'sql': 'TEXT',
  },
});

client.login(token);