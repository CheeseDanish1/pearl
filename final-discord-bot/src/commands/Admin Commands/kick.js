const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  var target2 = message.mentions.members.first();
  if (!message.guild.me.hasPermission('KICK_MEMBERS'))
    return message.channel.send(
      '**' +
        message.author.username +
        "**I don't have Permission to Kick People"
    );

  if (!message.member.hasPermission('KICK_MEMBERS'))
    return message.channel.send(
      "You don't have Permission to use this command"
    );

  if (!target2) return message.channel.send('**Please Put Someone to Kick**');

  if (target2.id === message.guild.owner.id)
    return message.channel.send('**You can not Kick the server owner**');

  if (target2.id === message.author.id)
    return message.channel.send(`You can not kick yourself`);

  let embed = new Discord.MessageEmbed()
    .setTitle('Action : Kick')
    .setDescription(`Kicked ${target2} (${target2.id})`)
    .setColor('#ff2050')
    .setFooter(`Kicked by ${message.author.username}`);

  try {
    target2.kick(target2);
    message.channel.send(embed);
  } catch {
    message.channel.send('An error has occured');
  }
};

module.exports.info = {
  name: 'kick',
  alias: ['remove'],
  usage: '<p>Kick [Member]',
  example: '<p>Kick @Jimmy#7932',
  description: 'Kick a member from your server',
  category: 'moderation',
};
