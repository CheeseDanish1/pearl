const db = require('quick.db');
const ms = require('parse-ms');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.id === '327896498639470595' || message.author.id == "498281480133279746") {
        
        let user = message.mentions.members.first() || message.author;

        let money = parseInt(args[0]);

        if (isNaN(args[0])) {
            message.channel.send("What you provided is not a number")
            return;   
        }

        db.set(`money_${user.id}`, money)
 
        let embed = new Discord.MessageEmbed()
        .setTitle("Set Money")
        .addFields(
            { name: "Who set it ", value: `${message.author.tag}`},
            { name: "Money Got Set", value: `${user.user.username}`},
            { name: "Set to", value: `${money}`},
        )
        .setColor("RANDOM")

        message.channel.send(embed)

        return;

    } else message.channel.send("Command doesn't exist.");  
}