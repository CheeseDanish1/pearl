const {editAutomod} = require('../../Storage/database');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  if (!args || !args[0])
    return message.channel.send(`You need to provide how many mentions are ok`);

  if (!args[1])
    return message.channel.send(`You need to provide the number of warnings`);

  let newMen = parseInt(args[0]);
  let newWarnings = parseInt(args[1]);

  if (isNaN(newWarnings) || isNaN(newMen))
    return message.channel.send('That is not a valid number');

  if (newWarnings < 0 || newWarnings > 100)
    return message.channel.send(
      `The amount of warnings given has to be between 0 and 100`
    );

  message.channel.send(
    newWarnings == 0 || newMen == 0
      ? 'Turned off mass mention detection'
      : `Users will get \`${newWarnings}\` warnings for pinging more than \`${newMen}\` members`
  );
  let info =
    newMen == 0 || newWarnings == 0
      ? null
      : {max: newMen, warnings: newWarnings};
  editAutomod(message.guild.id, 'mentions', info);
};

module.exports.info = {
  name: 'massmentions',
  alias: ['massmention', 'maxmentions'],
  usage: '<p>MassMention [Max Mentions] [Warnings to give]',
  example: '<p>Mentions 6 2',
  description: 'Prevent users from mass pinging users or roles',
  category: 'moderation',
};
