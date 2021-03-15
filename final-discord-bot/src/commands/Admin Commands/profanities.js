const {editOps} = require('../../Storage/database');

module.exports.run = async (client, message, args, {GuildConfig}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      'You do not have permission to use this command'
    );
  message.channel.send(
    `${
      GuildConfig.ops.profanities ? 'Disabled' : 'Enabled'
    } swear detection accross the server`
  );
  editOps(message.guild.id, 'profanities', !GuildConfig.ops.profanities);
};
