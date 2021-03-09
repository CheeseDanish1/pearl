const db = require('quick.db');
const ms = require('parse-ms');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.id === '327896498639470595' || message.author.id == "498281480133279746") {
        
        let user = message.mentions.members.first() || message.member;

        let money = args[0];

        if (isNaN(args[0])) return;

        db.add(`money_${user.id}`, money);

        let embed = new Discord.MessageEmbed()
        .setTitle("Money Added")
        .addFields(
            { name: "From ", value: `${message.author.tag}`},
            { name: "To", value: `${user.user.username}`},
            { name: "Amount", value: `${money}`},
        )
        .setColor("GREEN")

        message.channel.send(embed)

        return;

    } else message.channel.send("Command doesn't exist.")
}