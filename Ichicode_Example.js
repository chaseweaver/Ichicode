const { Client, PermLevels } = require('komada');

const permStructure = new PermLevels()
  .addLevel(0, false, () => true)
  .addLevel(2, false, (client, msg) => {
    /* Dev + Mod + Admin */
    if (!msg.guild || !msg.guild.settings.adminRole || !msg.get.settings.modRole || !msg.get.settings.devRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
    const modRole = msg.guild.roles.get(msg.guild.settings.modRoles);
    const devRole = msg.guild.roles.get(msg.get.settings.devRole);
    return ((adminRole && msg.member.roles.has(adminRole.id)) || (modRole && msg.member.roles.has(modRole.id))
      || (devRole && msg.member.roles.has(devRole.id)));
  })
  .addLevel(3, false, (client, msg) => {
    /* Mod + Admin */
    if (!msg.guild || !msg.guild.settings.adminRole || !msg.get.settings.modRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
    const modRole = msg.guild.roles.get(msg.guild.settings.modRoles);
    return ((adminRole && msg.member.roles.has(adminRole.id)) || (modRole && msg.member.roles.has(modRole.id)));
  })
  .addLevel(4, false, (client, msg) => {
    /* Admin */
    if (!msg.guild || !msg.guild.settings.adminRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
    return ((adminRole && msg.member.roles.has(adminRole.id)));
  })
  .addLevel(4, false, (client, msg) => msg.guild && msg.author.id === msg.guild.owner.id)
  .addLevel(9, true, (client, msg) => msg.author.id === client.config.ownerID)
  .addLevel(10, false, (client, msg) => msg.author.id === client.config.ownerID);

const client = new Client({
  ownerID : 'OWNER_ID',
  prefix: '+',
  permStructure,
  clientOptions: {
    fetchAllMembers: false,
    sync: true,
  },
  cmdLogging: true,
});

client.login('BOT_TOKEN');