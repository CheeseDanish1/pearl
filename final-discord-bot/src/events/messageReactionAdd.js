const {MessageEmbed, ReactionCollector, User, MessageReaction, Client} = require('discord.js')
const db = require('quick.db')
const closeTicket = require('../Storage/functions').closeTicket
const GuildConfig = require('../database/models/GuildConfig')

/**
 * @param {Client} bot 
 * @param {MessageReaction} reaction 
 * @param {User} user 
 */

module.exports = async (bot, reaction, user) => {
    const message = reaction.message;
    const guild = message.guild

    logging()
    async function logging() {
        const Guild = await GuildConfig.findOne({id: guild.id});
        const loggingChannelId = Guild.logging.channel;
        if (!loggingChannelId) return;
        const loggingChannel = guild.channels.cache.get(loggingChannelId);
        if (!loggingChannel) return;
        const enabled = Guild.logging.events.includes("Message reactions");
        if (!enabled) return;

        const embed = new MessageEmbed()
            .setTitle('Message Reaction Added')
            .setColor('GREEN')
            .setDescription(`${user.username} reacted with ${reaction.emoji}`)
            .setURL(message.url)
            .setAuthor(user.username, user.displayAvatarURL())

        loggingChannel.send(embed);

        // let chanid = db.get(`loggingchannel_${guild.id}`)
        // if (!chanid) return;
        // let enabled = db.get(`mesreaction_${guild.id}`) == "enabled"
        // if (!enabled) return;

        

        // let chan = bot.channels.cache.get(chanid)

        // chan.send(embed)
    }
    
    rr().catch(console.dir)

    async function rr() {
        const Guild = await GuildConfig.findOne({id: guild.id})
        const obj = Guild.reactionRoles.find(r => r.MessageId == message.id)
        if (!obj) return;
        if (reaction.emoji.name != obj.Reaction) return;
        const role = guild.roles.cache.get(obj.Role);
        if (!role) return;
        const mem = guild.members.cache.get(user.id)
        mem.roles.add(role);
    }

    ticket()
    async function ticket() {
        const ticket = db.get(`ticket_${guild.id}`)

        if (!ticket) return;
        if (!ticket.mesid)
            if (message.id != ticket.mesid) return;

        if (reaction.emoji.name != "🎟️") return;

        let TicketCategory = message.guild.channels.cache.find(channel => channel.name === "Open Tickets");

        if (!TicketCategory) {
            await message.guild.channels.create('Open Tickets', {
                    type: 'category',
                    permissionOverwrites: [{
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL']
                    }]
                })
                .then(t => TicketCategory = t)
                .catch(console.error);
        }

        TicketCategory = message.guild.channels.cache.find(channel => channel.name === "Open Tickets");

        let reasonEmbed = new MessageEmbed()
            .setTitle("User " + user.username + " issued a ticket!")
            .setDescription("Pls solve as quickly as possible!")
            .setFooter("Type >Ticket delete or react with ❌ to close the ticket")
            .setColor('#32cd32');

        let roles = guild.roles.cache.filter(x => x.permissions.has("MANAGE_CHANNELS"))
        let perms = []

        roles.forEach(role => {
            perms.push({
                id: role.id,
            })
        });
        perms.push({
            id: user.id,
        });

        message.guild.channels.create(user.username + "s ticket", {
            type: "text",
            parent: TicketCategory.id,
        }).then(channel => {
            perms.forEach(p => channel.createOverwrite(p.id, {
                VIEW_CHANNEL: true
            }))
            channel.send(reasonEmbed).then(async mes => {
                const filter = (reactions, users) => users.id == user.id
                const collector = await new ReactionCollector(mes, filter)

                mes.react("❌")

                collector.on('collect', r => {
                    if (r.emoji.name == "❌") mes.react("✅").then(miodjf => mes.react("❎"))
                    if (r.emoji.name == "✅") closeTicket(guild, channel)
                    if (r.emoji.name == "❎") mes.reactions.cache.filter(re => re.emoji.name != "❌").forEach(re => re.remove())
                })
            })
        })
    }
}