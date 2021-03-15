const {changePrefix} = require('../../Storage/database');

module.exports.run = async (client, message, args, {GuildConfig}) => {
  var prefix = args[0];
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      'You do not have permission to use this command'
    );
  if (!prefix)
    return message.channel.send('Please give the new prefix you want to set');
  if (args[1]) return message.channel.send('You can not have a double prefix');
  if (prefix.length > 4)
    return message.channel.send(`Your prefix can't be more than 4 characters`);
  if (prefix == GuildConfig.prefix)
    return message.channel.send(
      `The new prefix cant be the same as the old one`
    );

  const _ = `Successfully updated server prefix to **${prefix}**`;
  message.channel.send(_);
  changePrefix(message.guild.id, prefix);
};
