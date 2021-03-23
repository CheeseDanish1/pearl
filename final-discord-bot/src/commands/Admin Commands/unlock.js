const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      'You do not have permission to use this command'
    );
  var channel = message.mentions.channels.first() || message.channel;
  let role = message.guild.roles.cache.find(r => (r.name = 'everyone'));

  channel
    .createOverwrite(role, {
      SEND_MESSAGES: true,
    })
    .catch(err => {
      message.channel.send('Error' + err);
      return;
    });

  let embed = new Discord.MessageEmbed()
    .setTitle('Channel Unlocked')
    .setDescription(
      `This channel has been unlocked by ${message.author.username}`
    )
    .setTimestamp();

  channel.send(embed);
};

module.exports.info = {
  name: 'unlock',
  alias: [],
  usage: '<p>Unlock [Channel]',
  example: '<p>Unlock #general',
  description: 'Allows @everyone to send messages to unlocked channel again',
  category: 'admin',
};
