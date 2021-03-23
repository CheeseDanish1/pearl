const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      'You do not have permission to use this command'
    );
  let channel = message.mentions.channels.first() || message.channel;
  let role = message.guild.roles.cache.find(r => (r.name = 'everyone'));

  channel
    .createOverwrite(role, {
      SEND_MESSAGES: false,
    })
    .catch(err => channel.send('Error\n' + err));

  let embed = new Discord.MessageEmbed()
    .setTitle('Channel Locked')
    .setDescription(
      `This channel has been locked by **${message.author.username}** `
    )
    .setTimestamp();

  message.channel.send(`Locked channel ${channel.name}`);
  channel.send(embed);
};

module.exports.info = {
  name: 'lock',
  alias: [],
  usage: '<p>Lock [Channel]',
  example: '<p>Lock #general',
  description: 'Prevent @everyone from sending messages in a certain channel',
  category: 'admin',
};
