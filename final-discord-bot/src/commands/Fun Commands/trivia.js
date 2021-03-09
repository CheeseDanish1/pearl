const Discord = require("discord.js");
const ms = require('pretty-ms')
const parse = require('parse-ms')
const db = require('quick.db');
const questions = require('../../Storage/trivia')

module.exports.run = async (bot, message, args, {UserConfig}) => {

    let timeout = 10000;
    let triviaTimeout = UserConfig.timeout.trivia

    if (triviaTimeout !== null && timeout - (Date.now() - triviaTimeout) > 0) {
        let time = parse(timeout - (Date.now() - triviaTimeout));
        message.channel.send(`You have to wait to do more trivia. \nYou can do trivia again in **${time.seconds}s**!`);
        return;
    }
    await UserConfig.updateOne({$set: {"timout.trivia": Date.now()}})

    //Get the questions
    let q = questions[Math.floor(Math.random() * questions.length)];
    let i = 0;

    //Get the time
    const prettyTime = ms(q.time, {
        verbose: true
    });

    //Make The Embed And Send It
    const Embed = new Discord.MessageEmbed()
        .setTitle(q.title)
        .setDescription(
            q.options.map((opt) => {
                i++;
                return `${i} - ${opt}\n`;
            })
        )
        .setColor(`GREEN`)
        .setFooter(`Reply to this message with the correct question number! You have ${prettyTime}.`);

    message.channel.send(Embed);


    try {
        //Get the users nessages
        let msgs = await message.channel.awaitMessages(
            (u2) => u2.author.id === message.author.id, {
                time: q.time,
                max: 1,
                errors: ["time"]
            }
        );

        //Check's if the user sent the right message
        if (parseInt(msgs.first().content) == q.correct) {
            message.channel.send(`You got it correct! Plus 15$`);
            db.add(`money_${message.author.id}`, 15);
            return;
        } else {
            message.channel.send(`You got it incorrect. Minus 5$`);
            db.subtract(`money_${message.author.id}`, 5);
            return;
        }
    } catch (e) {
        message.channel.send(`You did not answer. Minus 1$`);
        db.subtract(`money_${message.author.id}`, 1);
        return;
    }
}