const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  let member = args[0];
  if (!member)
    return message.channel.send(
      `Provide the id of the person you want to unban`
    );

  if (!message.guild.me.permissions.has('BAN_MEMBERS'))
    return message.channel.send(`I dont have permission to unbanned members`);

  if (!message.member.permissions.has('BAN_MEMBERS'))
    return message.channel.send(`You dont have permission to unban members`);

  let user = await message.guild.members
    .unban(args[0])
    .catch(err => message.channel.send(err));
  return message.channel.send(`**${user.username}** was successfully unbanned`);
};

module.exports.info = {
  name: 'unban',
  alias: [],
  usage: '<p>Unban [User Id]',
  example: '<p>Unban 9832981209838371',
  description: 'Unban member from server ban list',
  category: 'moderation',
};
