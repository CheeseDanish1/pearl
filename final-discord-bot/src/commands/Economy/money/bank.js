const UserModelConfig = require('../../../database/models/UserConfig');
const Discord = require('discord.js');

module.exports.run = async (client, message, args, {UserConfig}) => {
  let user = message.mentions.members.first() || message.author;

  let config;
  user == message.author
    ? (config = UserConfig)
    : (config =
        (await UserModelConfig.findOne({id: user.id})) ||
        (await UserModelConfig.create({id: user.id})));

  const bankAmount = config.economy.bank || 0;
  const bankLimit = config.xpg;

  let embed = new Discord.MessageEmbed()
    .setTitle(`${user.username}'s Bank Money`)
    .setDescription(`${user} has ${bankAmount}$/${bankLimit}$ in his bank`)
    .setColor('RANDOM')
    .setTimestamp();

  message.channel.send(embed);
};
