/** @format */

const {Message, Client, MessageEmbed} = require('discord.js');
const allLoggingEvents = require('../../Storage/allLoggingEvents');
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = async (client, message, args, {GuildConfig, prefix}) => {
  const logging = GuildConfig.logging;
  const {events, channel} = logging;

  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  const loggingChannel = message.guild.channels.cache.get(channel);
  const embed = new MessageEmbed();

  const allEvents = allLoggingEvents.map((event, index) => {
    let status = events.find(e => e == event) ? 'enabled' : 'disabled';
    return `Logging for \`${event}\` is **${status}** [${index + 1}]`;
  });

  embed.setTitle(`Logging configuration for ${message.guild.name}`);
  embed.setDescription(allEvents.join('\n'));
  embed.setColor('GREEN');
  embed.setFooter(
    loggingChannel
      ? `Logging channel for this server is #${loggingChannel.name}`
      : `There is no logging channel for this server, enable it with the ${prefix}SetChannel command`
  );

  message.channel.send(embed);
};
