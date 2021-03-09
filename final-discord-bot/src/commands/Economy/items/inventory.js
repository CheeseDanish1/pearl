/** @format */

const Client = require('discord.js').Client;
const Message = require('discord.js').Message;
const MessageEmbed = require('discord.js').MessageEmbed;
const RealUserConfig = require('../../../database/models/UserConfig');

/**
 *
 * @param {Client} botClient
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = async (client, message, args, {prefix, UserConfig}) => {
  const who = message.mentions.users.first() || message.author;
  if (who.bot) return message.channel.send('That user is a bot');

  let config =
    who == message.author
      ? UserConfig
      : await RealUserConfig.findOne({id: who.id});
  if (!config) {
    message.channel.send(
      `You have no items in your inventory.\nYou can buy some from the shop with the ${prefix}Shop command.`
    );
    return await UserConfig.create({id: who.id});
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
    console.log(item);
    let emoji = item.emoji || client.emojis.cache.get(item.emojiId);

    embed.addField(
      `${emoji} **${item.name}** — ${item.amount}`,
      item.description,
      false
    );
  });
  return message.channel.send(embed);
};;
