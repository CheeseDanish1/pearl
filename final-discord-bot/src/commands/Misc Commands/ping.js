const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
	let msg = await message.channel.send(`🏓 Pinging....`)
	let mes = "🏓 Pong!"
	mes += `\nLatency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`
	mes += `\nAPI Latency is ${Math.round(client.ws.ping)}ms`
	const _ = new Discord.MessageEmbed()
		.setTitle("Pong!")
		.setDescription(mes)
		.setColor("RANDOM");
	msg.edit(_);
	msg.edit("\u200B");
}