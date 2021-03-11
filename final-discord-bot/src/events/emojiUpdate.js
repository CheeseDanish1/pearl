const {MessageEmbed} = require('discord.js');
const GuildConfig = require('../database/models/GuildConfig');

module.exports = async (client, oldEmoji, newEmoji) => {
  // Make sure where in a server
  if (!newEmoji.guild) return;

  // Get the server configuration from the database
  const Guild =
    (await GuildConfig.findOne({id: newEmoji.guild.id})) ||
    (await GuildConfig.create({id: newEmoji.guild.id}));

  // If they dont have a logging channel exit
  if (!Guild.logging.channel) return;

  // If they dont have the event enabled then exit
  if (!Guild.logging.events.find(e => e == 'Emoji updates')) return;

  // Get the channel from the channel id
  const loggingChannel = newEmoji.guild.channels.cache.get(
    Guild.logging.channel
  );

  // Make sure the channel is their and has not been deleted
  if (!loggingChannel) return;

  // Create embed
  let embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Emoji Updated')
    .setTimestamp();

  // Add fields
  embed = addFields(embed, oldEmoji, newEmoji);

  // Send the embed
  loggingChannel.send(embed);
};

function addFields(embed, oldEmoji, newEmoji) {
  if (oldEmoji.name != newEmoji.name)
    embed.addFields(
      {
        name: 'Old Emoji Name',
        value: oldEmoji.name,
        inline: true,
      },
      {
        name: '\u200B',
        value: '\u200B',
        inline: true,
      },
      {
        name: 'New Emoji Name',
        value: newEmoji.name,
        inline: true,
      }
    );

  return embed;
}
