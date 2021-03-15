const ms = require('parse-ms');
const Discord = require('discord.js');
const {
  getUser,
  setTimeout,
  addMoney,
  removeMoney,
} = require('../../../Storage/database');

module.exports.run = async (client, message, args, {UserConfig}) => {
  let user = message.mentions.members.first();

  let timeout = 86400000;

  let robTimout = UserConfig.timeout.rob;

  if (robTimout !== null && timeout - (Date.now() - robTimout) > 0) {
    let time = ms(timeout - (Date.now() - robTimout));

    return message.channel.send(
      `You already robed someone today. \nYou can rob someone again in **${time.hours}h ${time.minutes}m ${time.seconds}s**!`
    );
  }

  if (!user) return message.channel.send('Please Put Someone To Rob');

  let t = await getUser(user);
  let targetUser = t.economy.balance || 0;
  let author = UserConfig.economy.balance || 0;

  if (author < 250) {
    return message.channel.send(`You need at least 250$ to rob someone`);
  }

  if (targetUser <= 0) {
    return message.channel.send(
      `${user.user.username} does not have anything to rob`
    );
  }

  let random = Math.floor(Math.random() * 400) + 1;

  let willRobFail = Math.floor(Math.random() * 10) + 1;

  if (willRobFail == 9 || willRobFail == 10) {
    message.channel.send(
      `You were caught! You had to pay ${random}$ to ${user}!`
    );
    Promise.all([
      setTimeout('rob', message.author.id),
      removeMoney(random, message.author.id),
      addMoney(random, user.id),
    ]);
  } else {
    let embed = new Discord.MessageEmbed()
      .setTitle('Rob Successful')
      .setDescription(`${message.author} stole ${random}$ from ${user}`)
      .setColor('GREEN')
      .setTimestamp();

    message.channel.send(embed);

    Promise.all([
      setTimeout('rob', message.author.id),
      addMoney(random, message.author.id),
      removeMoney(random, user.id),
    ]);
  }
};
