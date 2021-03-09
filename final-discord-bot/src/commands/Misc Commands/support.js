const Discord = require('discord.js')

module.exports.run = (client, message, args) => {
    const _ = new Discord.MessageEmbed()
        .setTitle("Support Server Invite")
        .setURL("https://discord.gg/NGS6DmA")
        .setColor("GREEN")
        .setTimestamp()
        .setDescription("Ask our support staff any questions you might have regarding Pearl!")
        .setFooter("https://discord.gg/NGS6DmA")

    message.channel.send(_);
}