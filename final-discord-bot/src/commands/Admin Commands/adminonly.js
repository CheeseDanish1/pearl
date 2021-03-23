const {editAutomod} = require('../../Storage/database');

module.exports.run = async (client, message, args, {GuildConfig: Guild}) => {
  if (!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(
      "You don't have permission to use this command"
    );

  let status = Guild.automod.adminOnly;
  editAutomod(message.guild.id, 'adminOnly', !status);
  return message.channel.send(
    `${status ? `Disabled` : `Enabled`} admin only mode`
  );
};

module.exports.info = {
  name: 'adminonly',
  alias: [],
  usage: '<p>Adminonly',
  example: '<p>Adminonly',
  description: 'Toggle admin only mode',
  category: 'moderation',
};
