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
      ? 'Turned off zalgo detection'
      : `Users will get \`${newWarnings}\` warnings for posting zalgo`
  );
  editAutomod(message.guild.id, 'zalgo', newWarnings);
};

module.exports.info = {
  name: 'zalgo',
  alias: ['zal'],
  usage: '<p>Zalgo [Warnings to give]',
  example: '<p>Zalgo 1',
  description:
    'Prevents users from sending messages with zalgo and warn them if they keep doing it',
  category: 'moderation',
};
