/** @format */

const allLoggingEvents = require('../../Storage/allLoggingEvents');
const {disableEvent} = require('../../Storage/database');

module.exports.run = async (client, message, args, {GuildConfig, prefix}) => {
  if (!message.member.hasPermission(`MANAGE_GUILD`))
    return message.channel.send(
      `You need the manage guild permission to use this command`
    );

  const loggingChannel = GuildConfig.logging.channel;
  if (!loggingChannel)
    return message.channel.send(
      `You dont have a logging channel set up for this server\nType ${prefix}SetChannel \`#channel\` to set a channel`
    );

  const num = args[0];
  if (!num)
    return message.channel.send(
      `You need to specify which logging event you want to disable by its number\nUse ${prefix}LoggingHelp for more info`
    );

  if (num != 'all' && parseInt(num) != num)
    return message.channel.send(
      `What you provide must be a number\nType \`${prefix}LoggingHelp\` for more info`
    );

  if ((num != 'all' && num > 20) || num < 1)
    return message.channel.send(
      `There is no logging for that number\nType \`${prefix}LoggingHelp\` and find the number with what event you want to enable logging for`
    );

  if (num == 'all') {
    await disableEvent(num, GuildConfig);
    return message.channel.send('Disabled logging for all events');
  }

  const event = allLoggingEvents[num - 1];

  if (!GuildConfig.logging.events.find(e => e == event))
    return message.channel.send(`Logging for \`${event}\` is already disabled`);

  await disableEvent(event, GuildConfig);

  return message.channel.send(`Disabled logging for \`${event}\``);
};

module.exports.info = {
  name: 'disable',
  alias: [],
  usage: '<p>Disable [Event Number | All]',
  example: '<p>Disable 19',
  description: 'Disable an event from being logged',
  category: 'logging',
};
