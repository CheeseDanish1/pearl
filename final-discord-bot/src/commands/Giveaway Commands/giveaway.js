module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      "You don't have permission to use this command"
    );

  if (args[0] && args[0].toLowerCase() == 'start')
    return require('./giveawayQuickStart').run(message, args);

  return require('./giveawayStart').run(client, message, args);
};

module.exports.info = {
  name: 'giveaway',
  alias: [],
  usage: '<p>Giveaway (start)',
  example: '<p>Giveaway',
  description:
    'Do `<p>Giveaway` to walk you through the process of creating a giveaway\nOr do `<p>Giveaway Start` for the quick setup',
  category: 'admin',
};
