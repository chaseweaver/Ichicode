exports.run = (client, guild) => {
  if(!guild.available) return;
  console.log(`Guild Removed: ${guild.name}. Now at ${client.guilds.size}.`);
};