const api = require('novelcovid');
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    let arg = args.slice(0).join(" ")

    if (!arg) return message.reply(":x: You must enter country or world")

    if (arg == "world") {

        try {
            const stayhome = api.all().then(response => {
                let covid = new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle("#StayHome")
                    .addField("Total Cases", response.cases, true)
                    .addField("Total Deaths", response.deaths, true)
                    .addField("Total Recovered", response.recovered, true)
                    .setImage("https://i2.milimaj.com/i/milliyet/75/0x0/5e6e497aadcdeb15e8c11dcf.jpg")
                    .setThumbnail("https://i2.milimaj.com/i/milliyet/75/0x0/5e6e497aadcdeb15e8c11dcf.jpg")
    
                message.channel.send(covid)
            })
        } catch (e) {
            message.channel.send(e)
        }

    } else {

        try {
            const stayhome2 = api.countries({country: arg}).then(response => {
                if (!response.cases) return message.channel.send("That country does not exist")
                let covid = new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle("#StayHome")
                    .addField("Total Cases", response.cases, true)
                    .addField("Total Deaths", response.deaths, true)
                    .addField("Total Recovered", response.recovered, true)
                    .setImage("https://i2.milimaj.com/i/milliyet/75/0x0/5e6e497aadcdeb15e8c11dcf.jpg")
                    .setThumbnail("https://i2.milimaj.com/i/milliyet/75/0x0/5e6e497aadcdeb15e8c11dcf.jpg")

                message.channel.send(covid)
            })
        } catch (e) {
            message.channel.send(e)
        }
    }
}