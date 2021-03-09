const db = require('quick.db')
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

    let sni = db.fetch(`snipe_${message.channel.id}`)

    if (!sni) return message.channel.send("Nothing to snipe")

    else {
        let embed = new Discord.MessageEmbed()
            .setTitle("Snipe")
            .setDescription(sni.split("-")[0])
            .setFooter("By " + sni.split("-")[1])
            .setColor("RED")

        message.channel.send(embed)
    }
}