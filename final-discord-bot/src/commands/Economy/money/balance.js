const {getUser} = require('../../../Storage/database');

module.exports.run = async (client, message, args, {UserConfig}) => {
  let user = message.mentions.members.first() || message.author;
  let config;
  user == message.author
    ? (config = UserConfig)
    : (config = await getUser(user));

  let money = config.economy.balance || 0;

  message.channel.send(`${user} has ${money}$`);
};
