const Discord = require('discord.js')

module.exports.run = (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have permission to use this command")
    var channel = message.mentions.channels.first() || message.channel;
    let role = message.guild.roles.cache.find(r => r.name = "everyone");
    let reason;
    if (args[0].startsWith("<@")) reason = args.slice(1).join(" ")
    else reason = args.join(" ")

    if (reason == undefined) reason = "No reason provided"

    channel.createOverwrite(role, {
        'SEND_MESSAGES': false
    }).catch(err => channel.send("Error"+err))

    let embed = new Discord.MessageEmbed()
        .setTitle("Channel Locked")
        .setDescription(`This channel has been locked by ${message.author.username} for ${reason}`)
        .setTimestamp()

    message.channel.send(`Locked channel ${channel}`)
    channel.send(embed)

}