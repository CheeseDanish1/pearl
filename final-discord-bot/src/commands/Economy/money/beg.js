const ms = require('parse-ms');
const {addMoney, setTimeout} = require('../../../Storage/database');

module.exports.run = async (client, message, args, {UserConfig}) => {
  const amount = Math.floor(Math.random() * (50 - 30)) + 30;
  const timeout = 60000;
  let begTimeout = UserConfig.timeout.beg;

  if (begTimeout !== null && timeout - (Date.now() - begTimeout) > 0) {
    let time = ms(timeout - (Date.now() - begTimeout));

    message.channel.send(
      `You have been begging to much lately! \nYou can start beggining again in **${time.seconds}** seconds!`
    );
  } else {
    message.channel.send(`You've begged and received you ${amount}$`);

    await addMoney(amount, message.author.id);
    await setTimeout('beg', message.author.id);
  }
};
