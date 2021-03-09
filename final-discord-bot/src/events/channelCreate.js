const Discord = require('discord.js')
const GuildConfig = require('../database/models/GuildConfig')

module.exports = async (client, channel) => {
    // Make sure where in a server
    if (!channel.guild) return;

    // Get the server configuration from the database
    const Guild = await GuildConfig.findOne({"id": channel.guild.id})

    // If they dont have a logging channel exit
    if (!Guild.logging.channel) return

    // If they dont have the event enabled then exit
    if (!Guild.logging.events.find(e => e == "Channel creation")) return

    // Get the channel from the channel id
    const loggingChannel = channel.guild.channels.cache.get(Guild.logging.channel)

    // Make sure the channel is their and has not been deleted
    if (!loggingChannel) return;

    // Create an embed
    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Channel Created', channel.guild.iconURL)
        .addField('Channel', channel)
        .addField('Channel Id', channel.id + `\n**----------------------**`)
        .setTimestamp()

    // Send the embed
    loggingChannel.send(embed)
}