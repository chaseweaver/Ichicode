const komada = require('komada');

const client = new komada.Client({
  ownerID : 'OWNER_ID',
  prefix: '+',
  clientOptions: {
    fetchAllMembers: false,
    sync: true,
  },
  cmdLogging: true,
});

client.login('BOT_TOKEN');