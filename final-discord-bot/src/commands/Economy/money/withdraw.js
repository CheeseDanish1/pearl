const Discord = require('discord.js');
const ms = require('parse-ms');

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

  //   db.subtract(`bank_${message.author.id}`, amount);
  //   db.add(`money_${message.author.id}`, amount);
  await UserConfig.updateOne({
    $inc: {
      'economy.bank': -parseInt(amount),
      'economy.balance': parseInt(amount),
    },
  });

  let embed = new Discord.MessageEmbed()
    .setTitle(`Withdraw`)
    .setColor('RANDOM')
    .addFields(
      {name: `Amount Withdrawed`, value: `${amount}$`},
      {
        name: `Current Money`,
        value: `${parseInt(senderMoney) + parseInt(amount)}$`,
      },
      {name: `Bank Money`, value: `${senderBankMoney - amount}$`}
    );
  message.channel.send(embed);
};
