const { Client, PermLevels } = require('komada');
const { master, token } = require('./config.js');

const permStructure = new PermLevels()
  .addLevel(0, false, () => true)
  .addLevel(2, false, (client, msg) => {
    /* Dev + Mod + Admin + Ext */
    if (!msg.guild || !msg.guild.settings.adminRole || !msg.guild.settings.modRole || !msg.guild.settings.devRole || !msg.guild.settings.extRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
    const modRole = msg.guild.roles.get(msg.guild.settings.modRoles);
    const devRole = msg.guild.roles.get(msg.guild.settings.devRole);
    const extRole = msg.guild.roles.get(msg.guild.settings.extRole);
    return ((adminRole && msg.member.roles.has(adminRole.id)) || (modRole && msg.member.roles.has(modRole.id))
      || (devRole && msg.member.roles.has(devRole.id)) || (extRole && msg.member.roles.has(extRole.id)) || msg.author.id === client.user.id);
  })
  .addLevel(3, false, (client, msg) => {
    /* Dev + Mod + Admin */
    if (!msg.guild || !msg.guild.settings.adminRole || !msg.guild.settings.modRole || !msg.guild.settings.devRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.settings.adminsRole);
    const modRole = msg.guild.roles.get(msg.guild.settings.modRoles);
    const devRole = msg.guild.roles.get(msg.guild.settings.devRole);
    return ((adminRole && msg.member.roles.has(adminRole.id)) || (modRole && msg.member.roles.has(modRole.id))
      || (devRole && msg.member.roles.has(devRole.id)) || msg.author.id === client.user.id);
  })
  .addLevel(4, false, (client, msg) => {
    /* Mod + Admin */
    if (!msg.guild || !msg.guild.settings.adminRole || !msg.guild.settings.modRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
    const modRole = msg.guild.roles.get(msg.guild.settings.modRoles);
    return ((adminRole && msg.member.roles.has(adminRole.id))
      || (modRole && msg.member.roles.has(modRole.id)) || msg.author.id === client.user.id);
  })
  .addLevel(5, false, (client, msg) => {
    /* Admin */
    if (!msg.guild || !msg.guild.settings.adminRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
    return ((adminRole && msg.member.roles.has(adminRole.id) || msg.author.id === client.user.id));
  })
  .addLevel(6, false, (client, msg) => msg.guild && msg.author.id === msg.guild.owner.id)
  .addLevel(9, true, (client, msg) => msg.author.id === client.config.ownerID)
  .addLevel(10, false, (client, msg) => msg.author.id === client.config.ownerID || msg.author.id === client.user.id);

const client = new Client({
  ownerID : master,
  prefix: '+',
  permStructure,
  clientOptions: {
    fetchAllMembers: false,
    sync: true,
    autoReconnect: true,
  },
  provider: { engine: 'nedb' },
  cmdLogging: true,
});

client.login(token);