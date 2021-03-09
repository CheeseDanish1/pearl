const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    let unbanned = args[0];

    // MESSAGES

    if (!unbanned) {
        let unbaninfoembed = new Discord.MessageEmbed()
            .setTitle("Command: unban")
            .setDescription(
                `**Description:** Unban a member. \n` +
                "**Usage:**\n" +
                "-unban [user] (limit) (reason) \n" +
                "**Examples:** \n" +
                "-unban <@597253939469221891> good guy \n" +
                "-unban 597253939469221891 good guy "
            )
            .setColor("random");
        return message.channel.send(unbaninfoembed);
    }

    let member = client.users.fetch(unbanned);

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
        let botnoperms = new Discord.MessageEmbed()
            .setDescription("I do not have permissions, please contact an administrator")
            .setColor("#2C2F33");
        return message.channel.send(botnoperms);
    }

    if (!message.member.permissions.has("BAN_MEMBERS")) {
        let nopermsembed = new Discord.MessageEmbed()
            .setDescription("You do not have permission `BAN MEMBERS` contact an administrator")
            .setColor("#2C2F33");
        return message.channel.send(nopermsembed);
    }
    
    message.guild.members.unban(args[0]).catch((err) => message.channel.send(err))
    let successfullyembed = new Discord.MessageEmbed()
        .setTitle(`${member.username} has been successfully unbanned.`)
        .setColor("#2C2F33");

    return message.channel.send(successfullyembed);
};