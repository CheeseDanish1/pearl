module.exports.run = async (client, message, args, {UserConfig}, real) => {
  if (!real) return message.channel.send(`Command doesn't exist.`);

  let rand = getRndInteger(1, 50);
  console.log(rand);
  if (rand <= 49) return message.channel.send('This does nothing!');

  await UserConfig.updateOne({$inc: {'economy.balance': 10000}});
  message.channel.send('Here, take 10,000 and dont tell anyone, okay?');
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
