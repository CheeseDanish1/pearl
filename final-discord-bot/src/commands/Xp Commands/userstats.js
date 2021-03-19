const Discord = require('discord.js');
const {level} = require('../../Storage/functions');
const {mes} = require('../../Storage/onMesInfo');

module.exports.run = async (
  client,
  message,
  args,
  {prefix, UserConfig, GuildMemberConfig}
) => {
  let xpg = UserConfig.xpg;
  let xp = GuildMemberConfig.xp;
  let messages = GuildMemberConfig.messages;
  let messagesg = UserConfig.messages;
  let levelN = level(xp);
  let levelg = level(xpg);

  let embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username} Stats`)
    .addFields(
      {
        name: 'Local Messages Sent',
        value: messages,
      },
      {
        name: 'Local Xp',
        value: xp,
      },
      {
        name: 'Local Xp Level',
        value: levelN,
      },
      {
        name: 'Server Xp Ranking',
        value: `#${await getRankLevels()}`,
      },
      {
        name: 'Global Messages Sent',
        value: messagesg,
      },
      {
        name: 'Global Xp',
        value: xpg,
      },
      {
        name: 'Global Xp Level',
        value: levelg,
      },
      {
        name: 'Global Xp Ranking',
        value: `#${await getRankGlobal()}`,
      }
    )
    .setColor('RANDOM')
    .setFooter(
      `To see your xp rank, do ${prefix}xplb! || You can only get xp once a minute!`
    )
    .setTimestamp();

  message.channel.send(embed);

  async function getRankLevels() {
    let r = await GuildMemberConfig.collection.find().sort({xp: -1}).toArray();

    return (
      r
        .filter(g => g.guild == message.guild.id)
        .indexOf(r.find(g => g.id == message.author.id)) + 1
    );
  }

  async function getRankGlobal() {
    let r = await UserConfig.collection.find().sort({xpg: -1}).toArray();

    return r.indexOf(r.find(g => g.id == message.author.id)) + 1;
  }
};

module.exports.info = {
  name: 'userstats',
  alias: [],
  usage: '<p>Userstats',
  example: '<p>Userstats',
  description: 'Get your stats and rankings',
  category: 'xp',
};
