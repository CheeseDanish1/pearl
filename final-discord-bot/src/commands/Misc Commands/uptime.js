const ms = require('parse-ms');
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    let time = ms(client.uptime)

    let uptime = `${time.days} days, ${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds`;
    let embed = new Discord.MessageEmbed()
        .setTitle("Bot Uptime")
        .setDescription(uptime)
        .setColor("GREEN")

    message.channel.send(embed);
}