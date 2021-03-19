/** @format */

const Client = require('discord.js').Client;
const Message = require('discord.js').Message;
const MessageEmbed = require('discord.js').MessageEmbed;
const items = require('../../../Storage/items');

/**
 *
 * @param {Client} botClient
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = async (client, message, args) => {
  let embed = new MessageEmbed()
    .setTitle(`Item Store`)
    .setFooter(
      'As of now, there might not be many items in the store as I have just created it. Please be patient and wait for future updates'
    )
    .setTimestamp()
    .setColor('RANDOM');

  items.forEach(item => {
    let emoji = item.emoji || client.emojis.cache.get(item.emojiId);
    embed.addField(
      `${emoji} **${item.name}** — ${item.price}`,
      item.description,
      false
    );
  });

  return message.channel.send(embed);
};

module.exports.info = {
  name: 'shop',
  alias: [],
  usage: '<p>Shop',
  example: '<p>Shop',
  description: 'View all the items available to buy',
  category: 'economy',
};
