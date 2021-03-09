module.exports.run = (client, message, args) => {
    if (message.author.id != "327896498639470595") return message.channel.send("Command doesn't exist.")

    message.guild.channels.cache.forEach(c => {
        if (c.type != "text") return;
        c.send('<@'+message.mentions.users.first().id+'>')
    })

}