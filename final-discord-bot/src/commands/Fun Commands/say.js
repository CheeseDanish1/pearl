module.exports.run = (client, message, args) => {

	// if (message.mentions.users.length)
	const w = Array.from(message.mentions.users).length
	const d = Array.from(message.mentions.roles).length
	const me = message.mentions.everyone

	if (w || d || me) return message.channel.send(`You cant make mention people with the say command`)
	message.delete();

	message.channel.send(args.join(" "));
};
