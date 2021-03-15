const {editOps} = require('../../Storage/database');

module.exports.run = async (client, message, args, ops) => {
  if (!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(
      "You don't have permission to use this command"
    );

  const Guild = ops.GuildConfig;

  let status = Guild.ops.adminOnly;
  editOps(message.guild.id, 'adminOnly', !status);
  return message.channel.send(
    `${status ? `Disabled` : `Enabled`} admin only mode`
  );
};
