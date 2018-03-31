const { Task } = require('klasa');

module.exports = class extends Task {
	async run({ member, role }) {
		if (!member || !role) return;
		await member.roles.remove(role).catch(error => console.log(error));
	}
};