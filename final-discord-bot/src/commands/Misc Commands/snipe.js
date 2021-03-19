const Discord = require('discord.js');

module.exports.run = async (bot, message, args, {GuildConfig}) => {
  let sni = GuildConfig.snipe.find(c => c.id == message.channel.id);

  if (!sni) return message.channel.send('Nothing to snipe');
  else {
    let embed = new Discord.MessageEmbed()
      .setTitle('Snipe')
      .setDescription(sni.content)
      .setFooter('By ' + sni.author)
      .setColor('RED');

    message.channel.send(embed);
  }
};

module.exports.info = {
  name: 'snipe',
  alias: [],
  usage: '<p>Snipe',
  example: '<p>Snipe',
  description: 'Snipe a the mostly recently deleted message in a channel',
  category: 'misc',
};
