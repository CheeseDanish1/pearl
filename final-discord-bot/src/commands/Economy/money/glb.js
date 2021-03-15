const Discord = require('discord.js');

module.exports.run = async (client, message, args, {UserConfig}) => {
  let start = 0;
  let end = 10;

  let all = await UserConfig.collection
    .find()
    .sort({'economy.balance': -1})
    .toArray();
  let mes = all.map((value, index) => {
    let w = client.users.cache.get(value.id);
    let bal = value.economy.balance;
    if (!w || !bal) return;
    return `#${index + 1} - ${w.username} - ${bal}`;
  });

  let embed = new Discord.MessageEmbed()
    .setTitle('Global Money Leaderboard')
    .setDescription(mes.slice(start, end).join('\n'))
    .setColor('GREEN')
    .setFooter(
      "If you don't see someone on this list it means they don't have any money"
    )
    .setTimestamp();

  message.channel.send(embed).then(m => {
    lb(mes);

    function lb(mes) {
      if (mes.length > end) m.react('◀️').then(me => m.react('▶️'));

      const filter = (reaction, user) => user.id == message.author.id;

      const collector = m.createReactionCollector(filter, {
        time: 60000,
      });

      collector.on('collect', async reaction => {
        if (reaction.emoji.name === '◀️') {
          start -= 10;
          end -= 10;
          m.edit(
            new Discord.MessageEmbed()
              .setTitle('Global MoneyLeaderboard')
              .setDescription(mes.slice(start, end).join('\n'))
              .setColor('GREEN')
              .setFooter(
                "If you don't see someone on this list it means they don't have any money"
              )
              .setTimestamp()
          );
        } else if (reaction.emoji.name === '▶️') {
          start += 10;
          end += 10;
          m.edit(
            new Discord.MessageEmbed()
              .setTitle('Global MoneyLeaderboard')
              .setDescription(mes.slice(start, end).join('\n'))
              .setColor('GREEN')
              .setFooter(
                "If you don't see someone on this list it means they don't have any money"
              )
              .setTimestamp()
          );
        }
      });
    }
  });
};
