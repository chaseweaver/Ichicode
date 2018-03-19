const { KlasaClient } = require('klasa');
const { master, token } = require('./config.js');

KlasaClient.defaultPermissionLevels
  .add(0, () => true)
  .add(2, (client, msg) => {
    if (!msg.guild) return false;
    else if (msg.author.id === (client.user.id || master)) return true;
    else if (msg.guild.configs.adminRole && msg.member.roles.has(msg.guild.configs.adminRole)) return true;
    else if (msg.guild.configs.modRole && msg.member.roles.has(msg.guild.configs.modRole)) return true;
    else if (msg.guild.configs.devRole && msg.member.roles.has(msg.guild.configs.devRole)) return true;
    else if (msg.guild.configs.extRole && msg.member.roles.has(msg.guild.configs.extRole)) return true;
    else if (msg.guild.configs.musicRole && msg.member.roles.has(msg.guild.configs.musicRole)) return true;
    else return false;
  })
  .add(3, (client, msg) => {
    if (!msg.guild) return false;
    else if (msg.author.id === (client.user.id || master)) return true;
    else if (msg.guild.configs.adminRole && msg.member.roles.has(msg.guild.configs.adminRole)) return true;
    else if (msg.guild.configs.modRole && msg.member.roles.has(msg.guild.configs.modRole)) return true;
    else if (msg.guild.configs.devRole && msg.member.roles.has(msg.guild.configs.devRole)) return true;
    else if (msg.guild.configs.extRole && msg.member.roles.has(msg.guild.configs.extRole)) return true;
    else return false;
  })
  .add(4, (client, msg) => {
    if (!msg.guild) return false;
    else if (msg.author.id === (client.user.id || master)) return true;
    else if (msg.guild.configs.adminRole && msg.member.roles.has(msg.guild.configs.adminRole)) return true;
    else if (msg.guild.configs.modRole && msg.member.roles.has(msg.guild.configs.modRole)) return true;
    else if (msg.guild.configs.devRole && msg.member.roles.has(msg.guild.configs.devRole)) return true;
    else return false;
  })
  .add(5, (client, msg) => {
    if (!msg.guild) return false;
    else if (msg.author.id === (client.user.id || master)) return true;
    else if (msg.guild.configs.adminRole && msg.member.roles.has(msg.guild.configs.adminRole)) return true;
    else if (msg.guild.configs.modRole && msg.member.roles.has(msg.guild.configs.modRole)) return true;
    else return false;
  })
  .add(6, (client, msg) => {
    if (!msg.guild) return false;
    else if (msg.author.id === (client.user.id || master)) return true;
    else if (msg.guild.configs.adminRole && msg.member.roles.has(msg.guild.configs.adminRole)) return true;
    else return false;
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

client.login(token);