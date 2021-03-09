const Discord = require('discord.js')
const GuildConfig = require('../database/models/GuildConfig')

module.exports = async (client, guild, user) => {
    if (!guild) return;
    const Guild = await GuildConfig.findOne({id: guild.id})
    if (!Guild.logging.channel) return;
    if (!Guild.logging.events.find(e => e == 'Member banned')) return;
    const loggingChannel = guild.channels.cache.get(Guild.logging.channel);
    if (!loggingChannel) return;

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor("User Banned", guild.iconURL)
        .addField('Banned User', user.tag)
        .addField('User Id', user.id + `\n**----------------------**`)
        .setTimestamp()
    loggingChannel.send(embed).catch()
}
