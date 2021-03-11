const Discord = require('discord.js');
const GuildConfig = require('../database/models/GuildConfig');

module.exports = async (client, guild, user) => {
  if (!guild) return;
  const Guild =
    (await GuildConfig.findOne({id: guild.id})) ||
    (await GuildConfig.create({id: guild.id}));
  if (!Guild.logging.channel) return;
  if (!Guild.logging.events.find(e => e == 'Member unbanned')) return;
  const loggingChannel = guild.channels.cache.get(Guild.logging.channel);
  if (!loggingChannel) return;

  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('User Unbanned', guild.iconURL)
    .addField('Unbanned User', user.tag)
    .addField('User Id', user.id + `\n**----------------------**`)
    .setTimestamp();
  loggingChannel.send(embed).catch();
};
