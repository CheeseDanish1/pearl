const Discord = require('discord.js');
const {getGuild} = require('../Storage/database');

module.exports = async (client, emoji) => {
  // Make sure where in a server
  if (!emoji.guild) return;

  // Get the server configuration from the database
  const Guild = await getGuild(emoji.guild.id);

  // If they dont have a logging channel exit
  if (!Guild.logging.channel) return;

  // If they dont have the event enabled then exit
  if (!Guild.logging.events.find(e => e == 'Emoji deletion')) return;

  // Get the channel from the channel id
  const loggingChannel = emoji.guild.channels.cache.get(Guild.logging.channel);

  // Make sure the channel is their and has not been deleted
  if (!loggingChannel) return;

  // Create an embed
  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('Emoji Deleted', emoji.guild.iconURL)
    .addField('Emoji Name', emoji.name)
    .addField('Emoji Url', emoji.url + `\n**----------------------**`)
    .setTimestamp();

  // Send the embed
  loggingChannel.send(embed);
};
