module.exports = (client, msg) => {
  try {
    const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
    const modRole = msg.guild.roles.get(msg.guild.settings.modRoles);
    const devRole = msg.guild.roles.get(msg.guild.settings.devRole);
    const extRole = msg.guild.roles.get(msg.guild.settings.extRole);
    return ((adminRole && msg.member.roles.has(adminRole.id)) || (modRole && msg.member.roles.has(modRole.id))
      || (devRole && msg.member.roles.has(devRole.id)) || (extRole && msg.member.roles.has(extRole.id)) || msg.author.id === client.user.id);
  } catch (error) { console.log(error); }
};

module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: 'permissions',
  type: 'function',
  help: 'Validates whether or not the user is >= perm level 2.',
};