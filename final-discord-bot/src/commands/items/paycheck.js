const {addMoney} = require('../../Storage/database');

module.exports.run = async (client, message, args, {UserConfig}, real) => {
  if (!real) return message.channel.send(`Command doesn't exist.`);

  let randomAmount = getRndInteger(300, 800);
  //   db.add('money_' + message.author.id, randomAmount);
  message.channel.send('You used your paycheck, and got ' + randomAmount);
  addMoney(randomAmount, message.author.id);
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
