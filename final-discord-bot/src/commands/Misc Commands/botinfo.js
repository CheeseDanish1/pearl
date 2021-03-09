const {
    MessageEmbed
} = require('discord.js')

module.exports.run = (client, message, args) => {

    let servers = client.guilds.cache.size;
    let users = client.users.cache.size;
    let channels = client.channels.cache.size;

    let embed = new MessageEmbed()
        .setTitle(`${client.user.username} Information`)
        .setColor("GREEN")
        .setTimestamp()
        .addFields(
            { name: "Servers", value: servers, inline: true }, 
            { name: "Users", value: users, inline: true }, 
            { name: "Channels", value: channels, inline: true }, 
            // { name: "Commands (Prevous Hour)", value: preMin, inline: true}, 
            // { name: "Commands (Prevous Day)", value: preDay, inline: true }, 
            // { name: "Commands (All Time)", value: preAll, inline: true }, 
        )
        .setThumbnail(client.user.avatarURL())
        .setAuthor(`Pearl`, client.user.avatarURL())

    message.channel.send(embed)
}