const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    if (!message.member.hasPermission('BAN_MEMBERS')) {
        message.channel.send(
            "You don't have Permission to use this command"
        );
        return;
    }
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('**' + message.author.username + "**I don't have permission To Ban People");
    
    var target = message.mentions.members.first();
    if (!target) return message.channel.send('**Please Put Someone to Ban**');

    if (target.id === message.guild.owner.id) {
        message.channel.send('**You can not ban the server owner**');
        return;
    }
    if (target.id === message.author.id) {
        message.channel.send('**You can not ban yourself**');
        return;
    }
    let embed = new Discord.MessageEmbed()
        .setTitle('Action : Ban')
        .setDescription(`Banned ${target} (${target.id})`)
        .setColor('#ff2050')
        .setFooter(`Banned by ${message.author.username}`);

    message.channel.send(embed);
    target.ban(target);
}