const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setTitle('Invite!')
    .setURL(
      'https://discord.com/oauth2/authorize?client_id=732334443196317879&scope=bot&permissions=8'
    )
    .setDescription('Thank you for helping supporting me and using Pearl!')
    .setFooter(
      'https://discord.com/oauth2/authorize?client_id=732334443196317879&scope=bot&permissions=8'
    )
    .setColor('GREEN');

  message.channel.send(embed);
};

module.exports.info = {
  name: 'invite',
  alias: [],
  usage: '<p>Invite',
  example: '<p>Invite',
  description: 'Get pearls invite url',
  category: 'misc',
};
