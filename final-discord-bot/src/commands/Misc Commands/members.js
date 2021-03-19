const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  let start = 0;
  let end = 10;
  let mes = message.guild.members.cache
    .filter(m => !m.user.bot)
    .map(m => m.user.username)
    .sort();
  let embed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name} Members`)
    .setDescription(mes.slice(start, end).join('\n'))
    .setColor('GREEN')
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
              .setTitle(`${message.guild.name} Members`)
              .setDescription(mes.slice(start, end).join('\n'))
              .setColor('GREEN')
              .setTimestamp()
          );
        } else if (reaction.emoji.name === '▶️') {
          start += 10;
          end += 10;
          m.edit(
            new Discord.MessageEmbed()
              .setTitle(`${message.guild.name} Members`)
              .setDescription(mes.slice(start, end).join('\n'))
              .setColor('GREEN')
              .setTimestamp()
          );
        }
      });
    }
  });
};

module.exports.info = {
  name: 'members',
  alias: [],
  usage: '<p>Members',
  example: '<p>Members',
  description: 'Cycle through a list of all the servers members',
  category: 'misc',
};
