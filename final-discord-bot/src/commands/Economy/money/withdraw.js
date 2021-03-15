const Discord = require('discord.js');
const ms = require('parse-ms');
const {addMoney, addBank} = require('../../../Storage/database');

module.exports.run = async (client, message, args, {UserConfig}) => {
  const amount = args[0];
  const sender = message.author;
  let senderMoney = UserConfig.economy.balance || 0;
  let senderBankMoney = UserConfig.economy.bank || 0;

  if (!args[0])
    return message.channel.send(
      'You need to include the amount of money you want to withdraw'
    );
  if (args[1])
    return message.channel.send('You can only withdraw 1 value from your bank');
  if (amount > senderBankMoney)
    return message.channel.send(
      "Your you don't have that much money in your bank"
    );
  if (amount.includes('-'))
    return message.channel.send("You can't withdraw negative money");
  if (senderBankMoney == 0)
    return message.channel.send("You don't have any money to withdraw");
  if (isNaN(amount))
    return message.channel.send('The amount you withdraw must be a number');

  let mes = `You withdrawed **${amount}** from your bank`;
  message.channel.send(mes);

  Promise.all(addMoney(amount, sender.id), addBank(-amount, sender.id));
};
