const {editAutomod} = require('../../Storage/database');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  if (!args || !args[0])
    return message.channel.send(`You need to provide the number of warnings`);

  let newWarnings = parseInt(args[0]);

  if (isNaN(newWarnings))
    return message.channel.send('That is not a valid number');

  if (newWarnings < 0 || newWarnings > 100)
    return message.channel.send(
      `The amount of warnings given has to be between 0 and 100`
    );

  message.channel.send(
    newWarnings == 0
      ? 'Turned off invite detection'
      : `Users now will get \`${newWarnings}\` warnings for sending invites`
  );

  editAutomod(message.guild.id, 'invite', newWarnings);
};

module.exports.info = {
  name: 'removeinvites',
  alias: ['removeinvite'],
  usage: '<p>RemoveInvites [Warnings to give]',
  example: '<p>RemoveInvites 2',
  description: 'Prevent users from sending invites to other servers ',
  category: 'moderation',
};
