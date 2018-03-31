const { Task } = require('klasa');

module.exports = class extends Task {
	async run({ member, role }) {
		await member.roles.remove(role).catch(error => console.log(error));
	}
};