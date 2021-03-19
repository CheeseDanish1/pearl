/** @format */

const MessageEmbed = require('discord.js').MessageEmbed;
const allItems = require('../../../Storage/items');
const {getUser, createUser} = require('../../../Storage/database');
/**
 *
 * @param {Client} botClient
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = async (client, message, args, {prefix, UserConfig}) => {
  const who = message.mentions.users.first() || message.author;
  if (who.bot) return message.channel.send('That user is a bot');

  let config = who == message.author ? UserConfig : await getUser(who);
  if (!config) {
    message.channel.send(
      `You have no items in your inventory.\nYou can buy some from the shop with the ${prefix}Shop command.`
    );
    return await createUser(who);
  }
  const items = config.economy.inventory;
  if (!items || items.length <= 0) {
    return message.channel.send(
      `You have no items in your inventory.\nYou can buy some from the shop with the ${prefix}Shop command.`
    );
  }
  const embed = new MessageEmbed()
    .setTitle(`${who.username}'s Inventory`)
    .setColor('RED')
    .setTimestamp();

  if (items.find(item => item.Amount <= 0))
    return message.channel.send('Error');

  items.forEach(item => {
    if (!allItems.find(i => i.name == item.name)) return;
    let emoji = item.emoji || client.emojis.cache.get(item.emojiId);

    embed.addField(
      `${emoji} **${item.name}** — ${item.amount}`,
      item.description,
      false
    );
  });
  return message.channel.send(embed);
};

module.exports.info = {
  name: 'inventory',
  alias: [],
  usage: '<p>Inventory (Who)',
  example: '<p>Inventory\n<p>Inventory @Jimmy#7932',
  description: 'View all the items you have',
  category: 'economy',
};
