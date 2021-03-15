const {resetWarnings} = require('../../Storage/database');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      `You need the \`MANAGE_GUILD\` permissions to use this command`
    );

  const member = message.mentions.members.first();

  if (!member)
    return message.channel.send('Whos warnings do you want to reset?');

  if (member.user.bot) return message.channel.send('Bots dont have warnings');

  message.channel.send(`Reset ${member.displayName} warnings`);
  return resetWarnings(message.author.id);
};
