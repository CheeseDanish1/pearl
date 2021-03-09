const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    const me = client.users.cache.get("327896498639470595");

    const feedback = args.join(" ")

    let embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username}(${message.author.id}) Give's FeedBack`)
    .setDescription(feedback)
    .setColor("GREEN")
    .setTimestamp()

    me.send(embed).catch(err => message.channel.send("Error\n" + err))

    message.channel.send("Thank You For Your Feedback")
}