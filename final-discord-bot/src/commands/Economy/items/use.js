/** @format */

const Client = require('discord.js').Client;
const Message = require('discord.js').Message;
// const db = require('../../../database/connection');
const MessageEmbed = require('discord.js').MessageEmbed;

/**
 *
 * @param {Client} botClient
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = async (botClient, message, args, {prefix, UserConfig}) => {
  const what = args.join(' ');
  if (!what) return message.channel.send('What would you like to use?');
  const inventory = UserConfig.economy.inventory;

  if (!inventory.length)
    return message.channel.send(
      `You do not have anything in your inventory.\nYou can buy stuff with the ${prefix}Buy command and you can view the avalable items with the ${prefix}Shop command`
    );

  const item = inventory.find(item => item.lowercaseName == what.toLowerCase());

  if (!item) return message.channel.send('You do not have that item');

  const whatHappensWhenYouRunTheItem = require(`../../items/${item.name.toLowerCase()}`);
  whatHappensWhenYouRunTheItem.run(
    botClient,
    message,
    args,
    require('quick.db')
  );

  if (item.amount <= 1) {
    return await UserConfig.updateOne(
      {
        $pull: {'economy.inventory': item},
      } /* ,{
      arrayFilters: [{'i': item}]
    } */
    );
  }

  await UserConfig.updateOne(
    {$inc: {'economy.inventory.$[i].amount': -1}},
    {arrayFilters: [{'i.lowercaseName': item.lowercaseName}]}
  );
};
