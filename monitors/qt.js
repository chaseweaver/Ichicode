const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'qt',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: false,
      ignoreOthers: false,
      ignoreEdits: true,
    });
  }

  run() { 
    setTimeout(function(){ 
      this.client.guilds.find('id', '391483719803994113').channels.find('id', '391483720244264961')
        .send('<@!205757464807735296>, you\'re a QT'); 
    }, 1000 * 60 * 60 * 24);
  }
};