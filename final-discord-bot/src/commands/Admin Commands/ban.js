const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) {
    message.channel.send("You don't have Permission to use this command");
    return;
  }
  if (!message.guild.me.hasPermission('BAN_MEMBERS'))
    return message.channel.send(
      '**' + message.author.username + "**I don't have permission To Ban People"
    );

  var target = message.mentions.members.first();
  if (!target) return message.channel.send('You need to put someone to ban');

  let reason = args.slice(1).join(' ') || 'No reason given';

  if (target.id === message.guild.owner.id)
    return message.channel.send('You can not ban the server owner');

  if (target.id === message.author.id)
    return message.channel.send('You can not ban yourself');

  let embed = `Banned **${taget.user.username}** for **${reason}**`;

  message.channel.send(embed);
  target.ban();
};

module.exports.info = {
  name: 'ban',
  alias: ['banmember'],
  usage: '<p>Ban [Member] (reason)',
  example: '<p>Ban @friend#1234',
  description: 'Permanently remove member from server',
  category: 'admin',
};
