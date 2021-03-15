const ms = require('parse-ms');
const {removeMoney, addMoney} = require('../../../Storage/database');

module.exports.run = async (client, message, args, {UserConfig}) => {
  const target = message.mentions.members.first();
  const amount = args[1];
  const senderMoney = UserConfig.economy.balance;
  const userAccountAge = message.member.user.createdAt;
  const twoWeeks = 1209600000;
  const time = ms(twoWeeks - (Date.now() - userAccountAge));
  if (!target) return message.channel.send('You must mention someone');

  if (!amount)
    return message.channel.send('Please include an amount of money to send');

  if (isNaN(amount))
    return message.channel.send(
      'The amount of money you are paying must be a number'
    );

  if (Date.now() - userAccountAge < twoWeeks) {
    var messageBeingSent = `You accout must be 2 weeks or older to send money`;
    messageBeingSent += `\nYou will be able to send money in **${time.weeks}w ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**`;
    message.channel.send(messageBeingSent);
    return;
  }

  if (message.content.includes('-'))
    return message.channel.send('You can not pay someone negavative money');

  if (senderMoney == null)
    return message.channel.send('You do not have any money to send.');
  if (amount > senderMoney)
    return message.channel.send(
      'You are trying to send more money than you have'
    );

  let mes = `**${message.author.username}** sent **${amount}$** to **${target.user.username}**`;

  message.channel.send(mes);
  await removeMoney(amount, message.author.id);
  await addMoney(amount, target.id);
  return;
};
