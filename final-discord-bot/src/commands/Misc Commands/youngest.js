const Discord = require('discord.js')
const { formatDate } = require('../../Storage/functions')

module.exports.run = (client, message, args) => {
    let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => b.user.createdAt - a.user.createdAt)
      .first();
    const Embed = new Discord.MessageEmbed()
      .setTitle(`The youngest member in ${message.guild.name}`)
      .setColor(`RANDOM`)
      .setFooter(`Date format: MM/DD/YYYY`)
      .setDescription(`${mem.user.tag} is the youngest user in ${message.guild.name}!\nAccount creation date: ${formatDate(mem.user.createdAt)}`);
    message.channel.send(Embed);
}