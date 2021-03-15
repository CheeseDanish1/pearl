module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      "You don't have permission to use this command"
    );

  if (args[0]) return require('./quickStart').run(message, args);

  return require('./start').run(client, message, args);
};
