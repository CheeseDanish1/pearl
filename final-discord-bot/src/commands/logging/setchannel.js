const {setLoggingChannel} = require('../../Storage/database');

module.exports.run = async (client, message, args, {GuildConfig, prefix}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  const channel = message.mentions.channels.first();
  if (!channel)
    return message.channel.send(
      `Please mention the channel you want to set as the logging channel\nExample - \`${prefix}SetChannel #channel\``
    );

  await setLoggingChannel(channel.id, GuildConfig);
  return message.channel.send(
    `Successfully set logging channel to ${channel.toString()}`
  );
};
