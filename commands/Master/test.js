const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'test',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 10,
      botPerms: [],
      requiredConfigs: [],
      description: 'Whatever test.',
      quotedStringSupport: true,
      usage: '<member:member>',
      usageDelim: '',
      extendedHelp: '',
    });
  }

  async run(msg, [mem]) {
    let kicks = 0, bansAdd = 0, bansRemove = 0;
    let active = true;

    const fetch = (time) => {
      msg.guild.fetchAuditLogs({ before: time, user: mem, limit: 100 }).then(logs => {
        const arr = logs.entries.values();

        for (let i = 0; i < arr.length; i++) {
          let ts = arr[i].createdTimestamp;
          if (arr[i].id !== (undefined || null)) ts = arr[i].id;
          if (!arr[i].target || arr[i].targetType !== 'USER' || arr[i].target.id !== mem.id) return;
          console.log(arr[i].executor.tag + ' / ' + arr[i].executor.id + '\t' + arr[i].action + '\t' + 
            arr[i].target.tag + ' / ' + arr[i].target.id + '\t' + new Date(arr[i].createdTimestamp));
          if (arr[i].action === 'MEMBER_KICK') kicks++;
          if (arr[i].action === 'MEMBER_BAN_ADD') bansAdd++;
          if (arr[i].action === 'MEMBER_BAN_REMOVE') bansRemove++;
        }

        if (ts >= time) return fetch(ts);
        else return active = false;
      })
      .then(function() {
        if (!active) {
          console.log('Kicks:\t' + kicks);
          console.log('Add:\t' + bansAdd);
          console.log('Remove:\t' + bansRemove);
        }
      })
      .catch(console.error);
    };

    await fetch(msg.guild.createdTimestamp);
  }
};