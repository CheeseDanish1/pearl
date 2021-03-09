const GuildConfig = require('../database/models/GuildConfig')
const Discord = require('discord.js')

module.exports = async (client, member) => {
    console.log(`User ${member.user.username} has left Server: ${member.guild.name} `);

    const {guild} = member
    const Guild = await GuildConfig.findOne({id: guild.id})
    if (!Guild.logging.channel) return;
    if (!Guild.logging.events.find(e => e == 'Member leaves')) return;
    const loggingChannel = guild.channels.cache.get(Guild.logging.channel);
    if (!loggingChannel) return;

    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor("User Left", member.guild.iconURL)
        .addField('User Tag', member.user.tag)
        .addField('User Id', member.user.id + `\n**----------------------**`)
        .setTimestamp()
    loggingChannel.send(embed).catch()
}