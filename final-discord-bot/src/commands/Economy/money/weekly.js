const ms = require('parse-ms');
const Discord = require('discord.js');

module.exports.run = async (client, message, args, {UserConfig}) => {
  let timeout = 604800000;
  let amount = Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000;

  let weekly = UserConfig.timeout.weekly;

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));

    message.channel.send(
      `You already collected your weekly reward! \nYou can come back and collect it in **${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**!`
    );
  } else {
    let embed = new Discord.MessageEmbed()
      .setAuthor(`Weekly`, message.author.avatarURL())
      .setColor('GREEN')
      .setDescription(`**Weekly Reward**`)
      .addFields({
        name: 'Collected',
        value: amount,
      });

    message.channel.send(embed);
    // db.add(`money_${message.author.id}`, amount)
    // db.set(`weekly_${message.author.id}`, Date.now())
    await UserConfig.updateOne({
      $inc: {'economy.balance': amount},
      $set: {'timeout.weekly': Date.now()},
    });
  }
};
