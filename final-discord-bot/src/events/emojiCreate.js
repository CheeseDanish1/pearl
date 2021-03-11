const Discord = require('discord.js');
const GuildConfig = require('../database/models/GuildConfig');

module.exports = async (client, emoji) => {
  // Make sure where in a server
  if (!emoji.guild) return;

  // Get the server configuration from the database
  const Guild =
    (await GuildConfig.findOne({id: emoji.guild.id})) ||
    (await GuildConfig.create({id: emoji.guild.id}));

  // If they dont have a logging channel exit
  if (!Guild.logging.channel) return;

  // If they dont have the event enabled then exit
  if (!Guild.logging.events.find(e => e == 'Emoji creation')) return;

  // Get the channel from the channel id
  const channel = emoji.guild.channels.cache.get(Guild.logging.channel);

  // Make sure the channel is their and has not been deleted
  if (!channel) return;

  // Create an embed
  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('Emoji Created', emoji.guild.iconURL)
    .addField('Emoji Name', emoji.name)
    .addField('Emoji', emoji + `\n**----------------------**`)
    .setTimestamp();

  // Send the embed
  channel.send(embed);
};
