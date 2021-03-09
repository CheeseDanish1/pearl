const Discord = require('discord.js');
const userUpdate = require('../../events/userUpdate');

module.exports.run = (client, message, args) => {
    
    let mcnotbot = message.guild.members.cache.filter((member) => !member.user.bot).size;
    let mcwithbots = message.guild.memberCount;
    
    let mes = `This server has ${mcnotbot} members excluding bots.`;
    mes += `\nIncluding bots this server has ${mcwithbots} members.`;

    let embed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name} Member Count`)
    .setDescription(mes)
    .setColor("RANDOM")
    .setTimestamp();

    message.channel.send(embed)
}