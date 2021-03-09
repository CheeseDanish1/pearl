const Discord = require('discord.js');
const Message = require('discord.js').Message;
const db = require('quick.db')
const {
    formatDate
} = require('../../Storage/functions')

/**
 * 
 * @param {Message} message 
 */

module.exports.run = (client, message, args) => {

    let member;

    !args ? member = message.mentions.members.first() || message.member : member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username == args.join(" ")) || message.guild.members.cache.get(args[0]) || message.member

    if (member.user.bot) return message.channel.send("That user is a bot!");
    let roles = ""
    member._roles.forEach(r => roles += `${message.guild.roles.cache.get(r).toString()} `)

    let final
    if (!member.user.presence.activities[0]) final = "No status"
    if (!final) {

        if (member.user.presence.activities[0].name == 'Custom Status') {
            final = member.user.presence.activities[0].state;
        } else {
            let first = member.user.presence.activities[0].type.toLowerCase();
            let what = member.user.presence.activities[0].name
            first = titleCase(first)
            final = `${first}: ${what}`

            function titleCase(str) {
                var splitStr = str.toLowerCase().split(' ');
                for (var i = 0; i < splitStr.length; i++) {
                    // You do not need to check if i is larger than splitStr length, as your for does that for you
                    // Assign it back to the array
                    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
                }
                // Directly return the joined string
                return splitStr.join(' ');
            }
        }
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.avatarURL(), member.user.avatarURL())
        .addField('Warnings', db.get(`warnings_${message.guild.id}_${member.user.id}`) ? db.get(`warnings_${message.guild.id}_${member.user.id}`) : 0, true)
        .addField("Xp", db.get(`xp_${message.guild.id}_${member.user.id}`) ? db.get(`xp_${message.guild.id}_${member.user.id}`) : 0, true)
        .addField("Money", db.get(`money_${member.user.id}`) ? db.get(`money_${member.user.id}`) : 0, true)
        //.addField("Id", member.user.id, true)
        .addField("Status", final, true)
        .addField("Tag", member.user.tag, true)
        .addField("Presence", member.user.presence.status, true)
        .addField("Joined at", `${formatDate(member.joinedAt)}`, true)
        .addField("Nickname", `${member.nickname ? member.nickname : "No nickname set"}`, true)
        .addField("Roles", roles ? roles : "No Roles", true)
        .addField("Account Creation Date", formatDate(member.user.createdAt), true)
        .addField("\u200B", '\u200B', true)
        .addField("Id", member.user.id, true)
        .setColor("GREEN")
        .setTimestamp()


    message.channel.send(embed)
}