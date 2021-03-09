const ms = require('parse-ms');
const Discord = require('discord.js');

module.exports.run = async (client, message, args, {UserConfig}) => {
  let timeout = 86400000;
  let amount = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;

  let daily = UserConfig.timeout.daily;

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));

    message.channel.send(
      `You already collected your daily reward! \nYou can come back and collect it in **${time.hours}h ${time.minutes}m ${time.seconds}s**!`
    );
  } else {
    let embed = new Discord.MessageEmbed()
      .setAuthor(`Daily`, message.author.displayAvatarURL())
      .setColor('GREEN')
      .setDescription(`**Daily Reward**`)
      .addField(`Collected`, amount);

    message.channel.send(embed);
    // db.add(`money_${message.author.id}`, amount);
    // db.set(`daily_${message.author.id}`, Date.now());
    await UserConfig.updateOne({$inc: {'economy.balance': amount}});
    await UserConfig.updateOne({'timeout.daily': Date.now()});
  }
};
