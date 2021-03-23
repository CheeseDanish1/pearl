const {editAutomod} = require('../../Storage/database');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  if (!args || !args[0])
    return message.channel.send(
      `You need to provide the percent of caps are allowed are ok`
    );

  if (!args[1])
    return message.channel.send(`You need to provide the number of warnings`);

  let newCaps = parseInt(args[0]);
  let newWarnings = parseInt(args[1]);

  if (isNaN(newWarnings) || isNaN(newCaps))
    return message.channel.send('That is not a valid number');

  if (newWarnings < 0 || newWarnings > 100)
    return message.channel.send(
      `The amount of warnings given has to be between 0 and 100`
    );

  if (newCaps < 50 || newCaps > 100)
    return message.channel.send(
      `The amount of caps has to be between 50% and 100%`
    );

  message.channel.send(
    newWarnings == 0 || newCaps == 0
      ? 'Turned off mass caps detection'
      : `Users will get \`${newWarnings}\` warnings for messages that are more than \`${newCaps}%\` caps`
  );
  let info =
    newCaps == 0 || newWarnings == 0
      ? null
      : {percent: newCaps, warnings: newWarnings};
  editAutomod(message.guild.id, 'caps', info);
};

module.exports.info = {
  name: 'capsspam',
  alias: ['capspam', 'caps'],
  usage: '<p>CapsSpam [Perecent of Caps] [Warnings to give]',
  example:
    '<p>CapsSpam 70 2\nGives 2 warnings to anyone whos message is more than 70% caps',
  description: 'Prevent users from sending messages with too much caps',
  category: 'moderation',
};
