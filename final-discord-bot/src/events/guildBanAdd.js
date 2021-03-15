const Discord = require('discord.js');
const {getGuild} = require('../Storage/database');

module.exports = async (client, guild, user) => {
  if (!guild) return;
  const Guild = await getGuild(guild.id);
  if (!Guild.logging.channel) return;
  if (!Guild.logging.events.find(e => e == 'Member banned')) return;
  const loggingChannel = guild.channels.cache.get(Guild.logging.channel);
  if (!loggingChannel) return;

  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('User Banned', guild.iconURL)
    .addField('Banned User', user.tag)
    .addField('User Id', user.id + `\n**----------------------**`)
    .setTimestamp();
  loggingChannel.send(embed).catch();
};
