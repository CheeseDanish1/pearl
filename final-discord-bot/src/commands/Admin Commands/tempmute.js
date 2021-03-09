const Discord = require('discord.js');
const ms = require('ms');
const prettyMilliseconds = require('pretty-ms');

module.exports.run = (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES')) {
        message.channel.send(
            "You don't have Permission to use this command"
        );
        return;
    }
    if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
        message.channel.send('I do not have permission to manage roles.');
        return;
    }
    let mutedRole = message.guild.roles.cache.find(
        (role) => role.name == 'Muted'
    );
    let who = message.mentions.members.first();

    if (!who) return message.channel.send("Please specify who you want to mute");

    if (!args[1]) 
        return message.channel.send('Please specify an amount of time to mute the person for.\nExample: >TempMute @Cheese Danish 5m')

    let time = args[1];


    if (!/^(\d+(m|h|s))+$/ig.test(time)) return message.channel.send("The time you provided is invalid")

    time = ms(time)

    if (!who) {
        return message.channel.send("Please specify a user to temporary mute")
    }

    who.roles.add(mutedRole);
    let embed = new Discord.MessageEmbed()
        .setTitle('Action : Mute')
        .setDescription(
            `${who} Was Muted by ${message.author.tag} for ${prettyMilliseconds(time, {verbose: true})}.`
        )
        .setColor('#ff2050')
        .setFooter(`Muted by ${message.author.username}`);
    message.channel.send(embed);
    who.send(embed).catch(err => message.channel.send(`Error\n${err}`))

    setTimeout(() => {
        who.roles.remove(mutedRole);
        message.channel.send({
            embed: {
                title: 'Unmute',
                description: `${who} Was Unmuted after ${prettyMilliseconds(time, {verbose: true})}.`,
            },
        });
    }, time);
}