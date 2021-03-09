const Discord = require('discord.js');

module.exports.run = async (client, message, args, {UserConfig}) => {
  let amount = args[0];
  let senderMoney = UserConfig.economy.balance;
  let senderBankMoney = UserConfig.economy.bank;

  if (!senderMoney) senderMoney = 0;
  if (!senderBankMoney) senderBankMoney = 0;

  if (amount == 'max' || amount == 'all') {
    let e = UserConfig.xpg - senderBankMoney;
    amount = e ? senderMoney : e;
  }

  if (!args[0])
    return message.channel.send(
      'You need to include the amount of money you want to deposit'
    );
  if (args[1])
    return message.channel.send('You can only put 1 value into your bank');
  if (amount > senderMoney)
    return message.channel.send("You don't have that much money");
  if (amount.includes('-'))
    return message.channel.send("You can't deposit negative money");
  if (senderMoney == 0)
    return message.channel.send("You don't have any money to deposit");
  if (isNaN(amount) && amount != 'max' && amount != 'all')
    return message.channel.send('The amount you deposit must be a number');
  amount = parseInt(amount);
  if (senderBankMoney + amount > UserConfig.xpg)
    return message.channel.send("Your bank can't hold that much money");

  await UserConfig.updateOne({$inc: {'economy.bank': amount}});
  await UserConfig.updateOne({$inc: {'economy.balance': -amount}});

  let embed = new Discord.MessageEmbed()
    .setTitle(`Deposit`)
    .setColor('RANDOM')
    .addFields(
      {name: `Amount Deposited`, value: `${amount}$`},
      {
        name: `Current Money`,
        value: `${parseInt(UserConfig.economy.balance) - amount}$`,
      },
      {
        name: `Bank Money`,
        value: `${parseInt(UserConfig.economy.bank) + amount}$`,
      }
    );
  message.channel.send(embed);
};
