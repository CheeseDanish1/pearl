/** @format */

const Client = require('discord.js').Client;
const Message = require('discord.js').Message;
const items = require('../../../Storage/items');
const {sellItem, addMoney} = require('../../../Storage/database');
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = async (client, message, args, {prefix, UserConfig}) => {
  const what = args.join(' ');
  if (!what) return message.channel.send('What would you like to sell');

  let item = items.find(i => i.lowercaseName == what.toLowerCase());
  if (!item)
    return message.channel.send(
      'I am sorry, but the item you are trying to sell does not exist'
    );

  let inventory = UserConfig.economy.inventory;

  if (!inventory.length)
    return message.channel.send(
      `I'm sorry, but you dont have anything to sell. You can check your inventory with ${prefix}Inventory`
    );
  item = inventory.find(i => i.lowercaseName == what.toLowerCase());
  if (!item) return message.channel.send('You dont have that item');

  message.channel.send(
    `Succssfully sold item **${item.name}** for **${item.sellPrice}$**`
  );
  sellItem(item, message.author.id);
  addMoney(item.price, message.author.id);
};
