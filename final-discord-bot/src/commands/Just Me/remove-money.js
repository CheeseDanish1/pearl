const db = require('quick.db');
const ms = require('parse-ms');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.id === '327896498639470595' || message.author.id == "498281480133279746") {
        
        let user = message.mentions.members.first() || message.author;

        let money = args[0];

        if (isNaN(args[0])) return;

        if (db.fetch(`money_${user.id}`) == null) return message.channel.send("This is not set to anything")

        db.subtract(`money_${user.id}`, money);

        let embed = new Discord.MessageEmbed()
        .setTitle("Money Removed")
        .addFields(
            { name: "Removed By ", value: `${message.author.tag}`},
            { name: "Target", value: `${user.tag}`},
            { name: "Amount", value: `${money}`},
        )
        .setColor("GREEN")

        message.channel.send(embed)

        return;

    } else message.channel.send("Command doesn't exist.")
}