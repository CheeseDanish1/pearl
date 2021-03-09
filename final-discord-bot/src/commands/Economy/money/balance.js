const UserModelConfig = require('../../../database/models/UserConfig');

module.exports.run = async (client, message, args, {UserConfig}) => {
  let user = message.mentions.members.first() || message.author;
  let config;
  user == message.author
    ? (config = UserConfig)
    : (config =
        (await UserModelConfig.findOne({id: user.id})) ||
        (await UserModelConfig.create({id: user.id})));

  let money = config.economy.balance || 0;

  message.channel.send(`${user} has ${money}$`);
};
