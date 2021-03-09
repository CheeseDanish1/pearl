const Discord = require('discord.js')
const GuildConfig = require('../database/models/GuildConfig');
const {
    Client,
    VoiceState
} = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {VoiceState} oldState 
 * @param {VoiceState} newState 
 */
module.exports = async (client, oldState, newState) => {
    if (oldState.guild.me.id == newState.member.user.id) {
        if (oldState.channel && !newState.channel) {
            const serverQueue = client.queue.get(oldState.guild.id);
            if (!serverQueue) return
            client.queue.delete(oldState.guild.id)
        }
    }

    const Guild = await GuildConfig.findOne({id: oldState.guild.id})
    let y = Guild.logging.events.includes("Voice channel changes")
    if (!y) return;
    let x = Guild.logging.channel
    x = newState.guild.channels.cache.get(x)
    if (!x) return;


    let changed;

    if (!oldState.channelID && newState.channelID) {
        changed = "joined"
    }

    if (oldState.channelID && !newState.channelID) {
        changed = "left"
    }
    if (newState.selfMute && !oldState.selfMute) {
        changed = "muted"
    }
    if (!newState.selfMute && oldState.selfMute) {
        changed = "unmuted"
    }

    let embed = new Discord.MessageEmbed()
        .setColor("RED")

    const who = client.users.cache.get(newState.id)
    const channel = client.channels.cache.get(oldState.channelID || newState.channelID)

    switch (changed) {
        case "joined":
            embed
                .setTitle(`Joined A Voice Channel`)
                .setDescription(`\`${who.username}\` joined voice channel \`${channel.name}\``)
                .setFooter(`Person Id: ${who.id} || Channel Id: ${channel.id}`)
            x.send(embed).catch()
            break;
        case "left":
            embed
                .setTitle(`Left A Voice Channel`)
                .setDescription(`\`${who.username}\` left voice channel \`${channel.name}\``)
                .setFooter(`Person Id: ${who.id} || Channel Id: ${channel.id}`)
            x.send(embed).catch()
            break;
        case "muted":
            embed
                .setTitle(`Muted`)
                .setDescription(`\`${who.username}\` was muted in channel \`${channel.name}\``)
                .setFooter(`Person Id: ${who.id} || Channel Id: ${channel.id}`)
            x.send(embed).catch()
            break;
        case "unmuted":
            embed
                .setTitle(`Unmuted`)
                .setDescription(`\`${who.username}\` was unmuted in channel \`${channel.name}\``)
                .setFooter(`Person Id: ${who.id} || Channel Id: ${channel.id}`)
            x.send(embed).catch()
            break;

        default:
            break;
    }
}