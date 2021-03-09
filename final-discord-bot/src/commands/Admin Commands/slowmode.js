const ms = require('ms');
const prettyMilliseconds = require('pretty-ms');


module.exports.run = (client, message, args, {prefix}) => {

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permission to use this command")

    let channel = message.mentions.channels.first() || message.channel;

    let time = "";

    if (args[0] == message.mentions.channels.first()) {
        if (!args[1]) {
            return message.channel.send(`Please Provide An Amount Of Time You Would Like To Set The Slow Mode To \nExample - ${prefix}Slowmode #exampleChannel 5s`)
        }
        time = ms(args[1]);
        
    } else {
        if (!args[0]) {
            return message.channel.send(`Please Provide An Amount Of Time You Would Like To Set The Slow Mode To \nExample - ${prefix}Slowmode #exampleChannel 5s`)
        }
        if (isNaN(args[0][0])) return message.channel.send("You need to provide time in proper format\nExamples - 5s 1m 20s")
        time = ms(args[0])
        
    }

    let cooltime = prettyMilliseconds(time, {
        compact: true
    })
    let mstosec = time / 1000

    if (mstosec > 21600) return message.channel.send(`The time you put in is too large`)

    channel.setRateLimitPerUser(mstosec).catch((err) => message.channel.send("Error \n" + err))

    message.channel.send(`Set the slowmode of ${channel} too **${cooltime}**`);

}