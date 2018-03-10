const { KlasaClient } = require('klasa');
const { master, token } = require('./config.js');

KlasaClient.defaultPermissionLevels
  .add(0, () => true)
  .add(2, (client, msg) => {
    if (!msg.guild) return false;
    const has = msg.member.roles.has();
    const get = msg.guild.roles.get();
    let adminRole, modRole, devRole, extRole, musicRole;
    if (get(msg.guild.configs.adminRole)) adminRole = get(msg.guild.configs.adminRole);
    if (get(msg.guild.configs.modRole)) modRole = get(msg.guild.configs.adminRole);
    if (get(msg.guild.configs.devRole)) devRole = get(msg.guild.configs.adminRole);
    if (get(msg.guild.configs.extRole)) extRole = get(msg.guild.configs.adminRole);
    if (get(msg.guild.configs.musicRole)) musicRole = get(msg.guild.configs.adminRole);
    return msg.author.id === (client.user.id || master) || has(adminRole || modRole || devRole || extRole || musicRole);
  })
  .add(3, (client, msg) => {
    if (!msg.guild) return false;
    const has = msg.member.roles.has();
    const get = msg.guild.roles.get();
    let adminRole, modRole, devRole, extRole;
    if (get(msg.guild.configs.adminRole)) adminRole = get(msg.guild.configs.adminRole);
    if (get(msg.guild.configs.modRole)) modRole = get(msg.guild.configs.adminRole);
    if (get(msg.guild.configs.devRole)) devRole = get(msg.guild.configs.adminRole);
    if (get(msg.guild.configs.extRole)) extRole = get(msg.guild.configs.adminRole);
    return msg.author.id === (client.user.id || master) || has(adminRole || modRole || devRole || extRole);
  })
  .add(4, (client, msg) => {
    if (!msg.guild) return false;
    const has = msg.member.roles.has();
    const get = msg.guild.roles.get();
    let adminRole, modRole, devRole;
    if (get(msg.guild.configs.adminRole)) adminRole = get(msg.guild.configs.adminRole);
    if (get(msg.guild.configs.modRole)) modRole = get(msg.guild.configs.adminRole);
    if (get(msg.guild.configs.devRole)) devRole = get(msg.guild.configs.adminRole);
    return msg.author.id === (client.user.id || master) || has(adminRole || modRole || devRole);
  })
  .add(5, (client, msg) => {
    if (!msg.guild) return false;
    const has = msg.member.roles.has();
    const get = msg.guild.roles.get();
    let adminRole, modRole;
    if (get(msg.guild.configs.adminRole)) adminRole = get(msg.guild.configs.adminRole);
    if (get(msg.guild.configs.modRole)) modRole = get(msg.guild.configs.adminRole);
    return msg.author.id === (client.user.id || master) || has(adminRole || modRole);
  })
  .add(6, (client, msg) => {
    if (!msg.guild) return false;
    const has = msg.member.roles.has();
    const get = msg.guild.roles.get();
    let adminRole;
    if (get(msg.guild.configs.adminRole)) adminRole = get(msg.guild.configs.adminRole);
    return msg.author.id === (client.user.id || master) || has(adminRole);
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