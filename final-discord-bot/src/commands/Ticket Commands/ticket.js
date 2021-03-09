const Discord = require('discord.js');
const db = require('quick.db')
const { closeTicket } = require('../../Storage/functions')

module.exports.run = async (client, message, args, {prefix}) => {
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS") || !message.guild.me.hasPermission("MANAGE_ROLES"))
        return message.channel.send("Not enough permissions I require the `MANAGE_CHANNELS` and `MANAGE_ROLES` permission!");

    let TicketCategory = message.guild.channels.cache.find(channel => channel.name === "Open Tickets");

    if (!args[0]) return

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

    switch (args[0].toLowerCase()) {
        case "create":
            if (!args[1]) return message.reply(`Incorrect usage, please type ${prefix}Ticket Create [Reason]`)
            let reason = args.slice(1).join(" ")

            if (reason.length >= 1800)
                return message.reply("Pls describe your problem in less words");


            let reasonEmbed = new Discord.MessageEmbed()
                .setTitle("User " + message.author.username + " issued a ticket!")
                .setDescription(reason)
                .setFooter("Type >Ticket delete or react with ❌ to close the ticket")
                .setColor('#32cd32');

            let roles = message.guild.roles.cache.filter(x => x.permissions.has("MANAGE_CHANNELS"))
            let perms = []

            roles.forEach(role => {
                perms.push({
                    id: role.id,
                })
            });
            perms.push({
                id: message.author.id,
            });

            const user = message.author

            message.guild.channels.create(message.author.username + "s ticket", {
                type: "text",
                parent: TicketCategory.id,
            }).then(channel => {
                perms.forEach(p => channel.createOverwrite(p.id, {
                    VIEW_CHANNEL: true
                }))
                channel.send(reasonEmbed).then(async mes => {
                    const filter = (reactions, users) => users.id == user.id
                    const collector = await new Discord.ReactionCollector(mes, filter)
        
                    mes.react("❌")
        
                    collector.on('collect', r => {
                        if (r.emoji.name == "❌") mes.react("✅").then(miodjf => mes.react("❎"))
                        if (r.emoji.name == "✅") closeTicket(message.guild, channel)
                        if (r.emoji.name == "❎") mes.reactions.cache.filter(re => re.emoji.name != "❌").forEach(re => re.remove())
                    })
                })
            })
            break;
        case "delete":
            if (!message.channel.name.endsWith("ticket")) {
                message.reply("You must type this command in a open ticket");
                break;
            }

            message.reply("Are you sure you want to close this ticket?\nType `" + prefix + "ticket confirm` to confirm.");

            const collector = message.channel.createMessageCollector(
                m => m.content.toLowerCase().startsWith(prefix + "ticket confirm") && m.author.id == message.author.id, {
                    time: 20000,
                    max: 1
                }
            );
            collector.on('collect', m => {
                if (!m.channel.deletable) message.reply("Error!!! I cannot delete this channel");
                else closeTicket(message.guild, m.channel);
            });
            break;
        case "make":
            if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have permission to use this command")
            const embed = new Discord.MessageEmbed()
                .setTitle("Create a ticket")
                .setDescription("React with 🎟️ to make a ticket")
                .setColor("GREEN")
            let mes = await message.channel.send(embed);
            mes.react("🎟️")

            db.set(`ticket_${message.guild.id}.mesid`, mes.id)

        case "help":
            var help = new Discord.MessageEmbed()
                .setTitle("Hello " + message.author.username + "!")
                .setDescription("How to create a ticket? Use the commands in any channel of the discord server.")
                .addField(prefix + "ticket create <reason>", "Create a private channel with you and staff to solve to issuse together!")
                .addField(prefix + "ticket delete", "Issue is solved? then you can delete the channel with ticket delete")
                .setColor('#32cd32');
            message.channel.send(help);
            break;
        default:
            break;
    }

}