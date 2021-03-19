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

module.exports.run = async (botClient, message, args, {prefix}) => {
  const searchingFor = args[0];

  if (!searchingFor)
    return message.channel.send(
      `You did not mention an item you would like to get info on.\nTo view a list of available items, use the \`${prefix}Shop\` command.`
    );

  const item = items.find(i => i.lowercaseName == searchingFor.toLowerCase());

  if (!item)
    return message.channel.send(
      `The item you are looking for does not exist.\nTo view a list of available items, use the \`${prefix}Shop\` command.`
    );

  let embed = new MessageEmbed()
    .setTitle(`${item.name} Info`)
    .addField('Name', item.name, true)
    .addField('Price', item.price, true)
    .addField('Sell price', item.sellPrice, true)
    .addField('Description', item.description, false)
    .setTimestamp()
    .setColor('RANDOM');

  message.channel.send(embed);
};

module.exports.info = {
  name: 'info',
  alias: ['information'],
  usage: '<p>Info [Item name]',
  example: '<p>Info Paycheck',
  description: 'Get all the information on an item',
  category: 'economy',
};
