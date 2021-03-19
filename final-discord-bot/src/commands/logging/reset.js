const {resetEvents} = require('../../Storage/database');

module.exports.run = async (client, message, args, {GuildConfig}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      'You need the manage guild permission to use this command'
    );

  await resetEvents(GuildConfig);

  return message.channel.send(
    'Reset the logging configuration for this server'
  );
};

module.exports.info = {
  name: 'reset',
  alias: [],
  usage: '<p>Reset',
  example: '<p>Reset',
  description: 'Reset all logging events to the default',
  category: 'logging',
};
