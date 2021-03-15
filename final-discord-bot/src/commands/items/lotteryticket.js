const {addMoney} = require('../../Storage/database');

module.exports.run = async (client, message, args, ops, real) => {
  if (!real) return message.channel.send(`Command doesn't exist.`);
  let randomAmount = getRndInteger(1, 10000);

  if (randomAmount <= 9999)
    return message.channel.send(
      'Sorry, but you lost the lottery, better luck next time'
    );

  message.channel.send('You won 10000$ in the lottery. Congrats!');
  addMoney(10000, message.author.id);
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
