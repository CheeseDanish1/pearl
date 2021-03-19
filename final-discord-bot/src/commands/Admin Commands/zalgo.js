const {editOps} = require('../../Storage/database');

module.exports.run = async (client, message, args, {GuildConfig}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  let zal = GuildConfig.ops.zalgo;
  message.channel.send(
    `${zal ? 'Disabled' : 'Enabled'} zalgo detection for this server`
  );
  editOps(message.guild.id, 'zalgo', !zal);
};

module.exports.info = {
  name: 'zalgo',
  alias: ['zal'],
  usage: '<p>Zalgo',
  example: '<p>Zalgo',
  description: 'Toggle zalgo detection and deletion in your server',
  category: 'moderation',
};
