const Discord = require('discord.js');
const UserConfig = require('../../database/models/UserConfig');

module.exports.run = async (client, message, args) => {
  let start = 0;
  let end = 10;
  let res = (await dbsw()).filter(a => a);
  let embed = new Discord.MessageEmbed()
    .setTitle('Global Xp LeaderBoard')
    .setDescription(res.slice(start, end).join('\n'))
    .setColor('GREEN')
    .setFooter(
      "If you don't see someone on this list it means they don't have any xp"
    )
    .setTimestamp();

  message.channel.send(embed).then(m => {
    lb(res);

    function lb(mes) {
      //m.react('◀️').then(me => m.react('▶️'));
      if (mes.length > end) m.react('◀️').then(me => m.react('▶️'));

      const filter = (reaction, user) => user.id == message.author.id;

      const collector = m.createReactionCollector(filter, {
        time: 60000,
      });

      collector.on('collect', async reaction => {
        //console.log(start, end, mes.length)
        if (reaction.emoji.name === '◀️') {
          if (start != 0) {
            start -= 10;
            end -= 10;
            m.edit(
              new Discord.MessageEmbed()
                .setTitle('Global Xp LeaderBoard')
                .setDescription(res.slice(start, end).join('\n'))
                .setColor('GREEN')
                .setFooter(
                  "If you don't see someone on this list it means they don't have any xp"
                )
                .setTimestamp()
            );
          }
        } else if (reaction.emoji.name === '▶️') {
          start += 10;
          end += 10;
          m.edit(
            new Discord.MessageEmbed()
              .setTitle('Global Xp LeaderBoard')
              .setDescription(res.slice(start, end).join('\n'))
              .setColor('GREEN')
              .setFooter(
                "If you don't see someone on this list it means they don't have any xp"
              )
              .setTimestamp()
          );
        }
      });
    }
  });

  async function dbsw() {
    let all = await UserConfig.collection.find().sort({xpg: -1}).toArray();
    let i = 0;
    return all.map(value => {
      const w = client.users.cache.get(value.id);
      if (!w || !value.xpg) return;
      i += 1;
      return `#${i} - ${w.username} - ${value.xpg}`;
    });
  }
};

module.exports.info = {
  name: 'xpglb',
  alias: [],
  usage: '<p>Xpglb',
  example: '<p>Xpglb',
  description: 'View the global xp leaderboard and see your ranking',
  category: 'xp',
};
