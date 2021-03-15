/** @format */

const items = require('../../../Storage/items');
const Client = require('discord.js').Client;
const Message = require('discord.js').Message;
const {buyItem, removeMoney} = require('../../../Storage/database');

/**
 *
 * @param {Client} botClient
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = async (client, message, args, {prefix, UserConfig}) => {
  const what = args.join(' ');
  if (!what) return message.channel.send('What would you like to buy?');

  let item = items.find(i => i.lowercaseName == what.toLowerCase());
  if (!item)
    return message.channel.send(
      'I am sorry, but the item you are trying to buy does not exist'
    );

  let price = item.price;
  let bal = UserConfig.economy.balance;

  if (price > bal)
    return message.channel.send(
      `You dont have enough money to buy that item. You can check your balance with \`${prefix}bal\``
    );

  let inventory = UserConfig.economy.inventory;

  item.amount = 1;
  message.channel.send(
    `Successfully bought item **${item.name}** for **${item.sellPrice}$**!`
  );
  buyItem(item, inventory, message.author.id);
  removeMoney(item.price, message.author.id);
};
