const {Message, Client, MessageEmbed} = require('discord.js');

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  let channel =
    message.mentions.channels.first() ||
    (args[0] && message.guild.channels.cache.get(args[0]));
  let poll = args.slice(1).join(' ');
  if (!channel)
    return message.channel.send(
      'Please provide the channel you would like me to ask the poll in'
    );
  if (!poll) return message.channel.send('What would you like me to ask');

  const pollQuestion = new MessageEmbed()
    .setTitle(`New Poll From ${message.author.username}`)
    .setAuthor(message.author.username, message.author.avatarURL())
    .setDescription(poll)
    .setColor('RANDOM')
    .setTimestamp();

  channel.send(pollQuestion).then(async mes => {
    await mes.react('✅');
    await mes.react('❌');
  });
};
