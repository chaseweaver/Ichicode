const komada = require('komada');
 
const client = new komada.Client({
  ownerID : 'OWNER_ID',
  prefix: '+',
  clientOptions: {
    fetchAllMembers: false,
  },
  cmdLogging: true,
});
 
client.login('BOT_TOKEN');