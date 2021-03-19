const Discord = require('discord.js');
const {getUser} = require('../../../Storage/database');

module.exports.run = async (client, message, args, {UserConfig}) => {
  let user = message.mentions.members.first() || message.author;

  let config;
  user == message.author
    ? (config = UserConfig)
    : (config = await getUser(user));

  const bankAmount = config.economy.bank || 0;
  const bankLimit = config.xpg;

  let embed = new Discord.MessageEmbed()
    .setTitle(`${user.username}'s Bank Money`)
    .setDescription(`${user} has ${bankAmount}$/${bankLimit}$ in his bank`)
    .setColor('RANDOM')
    .setTimestamp();

  message.channel.send(embed);
};

module.exports.info = {
  name: 'balance',
  alias: ['bal'],
  usage: '<p>Balance (who)',
  example: '<p>Balance\n<p>Balance @Jimmy#7932',
  description: 'View how much money you currently have in your bank',
  category: 'economy',
};
