const { KlasaClient } = require('klasa');
const { master, token } = require('./config.js');

KlasaClient.defaultPermissionLevels
  .add(0, () => true)
  .add(2, (client, msg) => {
    if (!msg.guild) return false;
    const has = msg.member.roles.has();
    const { adminRole, modRole, devRole, extRole, musicRole } = msg.guild.roles.get(msg.guild.configs);
    return has(adminRole || modRole || devRole || extRole || musicRole) || msg.author.id === (client.user.id || master);
  })
  .add(3, (client, msg) => {
    if (!msg.guild) return false;
    const has = msg.member.roles.has();
    const { adminRole, modRole, devRole, extRole } = msg.guild.roles.get(msg.guild.configs);
    return has(adminRole || modRole || devRole || extRole) || msg.author.id === (client.user.id || master);
  })
  .add(4, (client, msg) => {
    if (!msg.guild) return false;
    const has = msg.member.roles.has();
    const { adminRole, modRole, devRole } = msg.guild.roles.get(msg.guild.configs);
    return has(adminRole || modRole || devRole) || msg.author.id === (client.user.id || master);
  })
  .add(5, (client, msg) => {
    if (!msg.guild) return false;
    const has = msg.member.roles.has();
    const { adminRole, modRole } = msg.guild.roles.get(msg.guild.configs);
    return has(adminRole || modRole) || msg.author.id === (client.user.id || master);
  })
  .add(6, (client, msg) => {
    if (!msg.guild) return false;
    const has = msg.member.roles.has();
    const { adminRole } = msg.guild.roles.get(msg.guild.configs);
    return has(adminRole) || msg.author.id === (client.user.id || master);
  })
  .add(7, (client, msg) => msg.guild && (msg.author.id === (msg.guild.owner.id || client.user.id)))
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