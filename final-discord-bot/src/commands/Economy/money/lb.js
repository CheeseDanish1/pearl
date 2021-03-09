const db = require('quick.db');
const Discord = require('discord.js');

module.exports.run = async (client, message, args, {UserConfig}) => {
  let re = await dbsw();
  console.log(re);
  let start = 0;
  let end = 10;
  let embed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name} Money Leaderboard`)
    .setDescription(re.slice(start, end).join('\n'))
    .setColor('GREEN')
    .setFooter(
      "If you don't see someone on this list it means they don't have any money"
    )
    .setTimestamp();

  message.channel.send(embed).then(m => {
    lb(re);
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
              .setTitle(`${message.guild.name} Money Leaderboard`)
              .setDescription(re.slice(start, end).join('\n'))
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
              .setTitle(`${message.guild.name} Money Leaderboard`)
              .setDescription(re.slice(start, end).join('\n'))
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

  async function dbsw() {
    let all = (
      await UserConfig.collection.find().sort({'economy.balance': -1}).toArray()
    ).filter(g => message.guild.members.cache.map(a => a.id).includes(g.id));
    return all.map((value, index) => {
      let who = message.guild.members.cache.get(value.id);
      let bal = value.economy.balance;
      if (!who || !bal) return;
      return `#${index + 1} - ${who.user.username} - ${bal}`;
    });
    // let all = db
    //   .all()
    //   .filter(d => d.ID.startsWith(wat))
    //   .sort((a, b) => b.data - a.data);
    // let mes = [];
    // all.forEach(a => {
    //   let who = message.guild.members.cache.get(a.ID.split('_')[1]);
    //   if (who) {
    //     mes.push(`${who.user.username} - ${a.data}`);
    //   }
    // });
    // return mes;
  }
};
