exports.run = (client, guild) => {
  if(!guild.available) return;
  console.log(`Guild Joined: ${guild.name}. Now at ${client.guilds.size}.`);
};