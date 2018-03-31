const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: 'Remind you something at a certain time!',
			usage: '<text:str> <when:time>',
			usageDelim: ' at '
		});
	}

	async run(msg, [text, when]) {
		const reminder = await this.client.schedule.create('reminder', when, {
			data: {
				member: msg.author,
				text: text
			},
			catchUp: true
		});
		return msg.send(`I will remind you then!`);
	}
};