const { Task } = require('klasa');

module.exports = class extends Task {
	async run({ member, text }) {
		return member.send(`You wanted me to remind you: \`${text}\``);
	}
};