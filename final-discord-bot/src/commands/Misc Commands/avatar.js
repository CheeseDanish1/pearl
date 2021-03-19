const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  let embed = new Discord.MessageEmbed()
    .setTitle(`${user.tag}`, user.displayAvatarURL())
    .setDescription(`${user.username} Profile Image`)
    .setImage(user.displayAvatarURL())
    .setTimestamp()
    .setColor('GREEN');
  message.channel.send(embed);
};

module.exports.info = {
  name: 'avatar',
  alias: ['profile', 'image', 'a'],
  usage: '<p>Profile [User]',
  example: '<p>Profile @Jimmy#7932',
  description: 'View a users full sized avatar',
  category: 'misc',
};
