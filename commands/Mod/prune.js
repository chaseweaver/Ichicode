const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'prune',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['purge'],
      permLevel: 3,
      botPerms: ['MANAGE_MESSAGES'],
      requiredConfigs: [],
      description: 'Prunes a certain amount of messages w/o filter.',
      quotedStringSupport: true,
      usage: '[channel:channel] <link|invite|bots|you|me|upload|user:user> [limit:integer]',
      usageDelim: '',
      extendedHelp: 'No extended help available.',
    });
  }
  async run(msg, [channel = msg.channel, filter = 'me', limit = 50]) {
    let messages = await channel.fetch({ limit: 100 });
    if (filter) {
      const user = typeof filter !== 'string' ? filter : null;
      const type = typeof filter === 'string' ? filter : 'user';
      messages = messages.filter(this.getFilter(msg, user, type));
    }
    messages = messages.array().slice(0, limit);
    await msg.channel.bulkDelete(messages);
    // return msg.send(`Successfully deleted ${messages.length} messages from ${limit}.`);
    return;
  }

  getFilter(msg, user, filter) {
    switch (filter) {
    case 'link': return mes => /https?:\/\/[^ /.]+\.[^ /.]+/.test(mes.content);
    case 'invite': return mes => /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(mes.content);
    case 'bots': return mes => mes.author.bot;
    case 'you': return mes => mes.author.id === this.client.user.id;
    case 'me': return mes => mes.author.id === msg.author.id;
    case 'upload': return mes => mes.attachments.size > 0;
    case 'user': return mes => mes.author.id === user.id;
    default: return () => true;
    }
  }
};
