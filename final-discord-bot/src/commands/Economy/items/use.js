/** @format */

const {sellItem} = require('../../../Storage/database');

module.exports.run = async (botClient, message, args, ops) => {
  const {prefix, UserConfig} = ops;
  const what = args.join(' ');
  if (!what) return message.channel.send('What item would you like to use?');
  const inventory = UserConfig.economy.inventory;

  if (!inventory.length)
    return message.channel.send(
      `You do not have anything in your inventory.\nYou can buy stuff with the ${prefix}Buy command and you can view the avalable items with the ${prefix}Shop command`
    );

  const item = inventory.find(item => item.lowercaseName == what.toLowerCase());

  if (!item) return message.channel.send('You do not have that item');

  const whatHappensWhenYouRunTheItem = require(`../../items/${item.name.toLowerCase()}`);
  whatHappensWhenYouRunTheItem.run(botClient, message, args, ops, 'd');

  sellItem(item, message.author.id);
};
