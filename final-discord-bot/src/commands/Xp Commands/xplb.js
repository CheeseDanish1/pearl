const Discord = require('discord.js');
const GuildMemberConfig = require('../../database/models/GuildMemberConfig');

module.exports.run = async (client, message, args) => {
  let start = 0;
  let end = 10;
  let i = 1;
  let re = (await dbsw('xp_')).filter(a => a);

  let embed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name}'s Xp LeaderBoard`)
    .setDescription(re.slice(start, end).join('\n'))
    .setColor('GREEN')
    .setFooter(
      "If you don't see someone on this list it means they don't have any xp"
    )
    .setTimestamp();

  message.channel.send(embed).then(m => {
    lb(re);

    function lb(mes) {
      //m.react('◀️').then(me => m.react('▶️'));
      if (mes.length > end) m.react('◀️').then(me => m.react('▶️'));

      const filter = (reaction, user) => user.id == message.author.id;
      //console.log(message.channel.messages.cache)
      /*let backArrow = message.channel.messages.cache.find(m => m.id == message.id).reactions.cache.get('◀️');
            let frontArrow = message.channel.messages.cache.find(m => m.id == message.id).reactions.cache.get('▶️');*/

      const collector = m.createReactionCollector(filter, {
        time: 60000,
      });

      collector.on('collect', async reaction => {
        if (reaction.emoji.name === '◀️') {
          start -= 10;
          end -= 10;
          m.edit(
            new Discord.MessageEmbed()
              .setTitle(`${message.guild.name}'s Xp LeaderBoard`)
              .setDescription(re.slice(start, end).join('\n'))
              .setColor('GREEN')
              .setFooter(
                "If you don't see someone on this list it means they don't have any xp"
              )
              .setTimestamp()
          );
        } else if (reaction.emoji.name === '▶️') {
          start += 10;
          end += 10;
          m.edit(
            new Discord.MessageEmbed()
              .setTitle(`${message.guild.name}'s Xp LeaderBoard`)
              .setDescription(re.slice(start, end).join('\n'))
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
    let all = await GuildMemberConfig.find({guild: message.guild.id}).sort({
      xp: -1,
    });
    // console.log(all)
    return all.map((value, index) => {
      const w = message.guild.members.cache.get(value.id);
      if (!w || !value.xp) return;
      return `#${index + 1} - ${w.displayName} - ${value.xp}`;
    });
  }
};

module.exports.info = {
  name: 'xplb',
  alias: [],
  usage: '<p>Xplb',
  example: '<p>Xplb',
  description: 'View the local xp leaderboard and see your ranking',
  category: 'xp',
};
