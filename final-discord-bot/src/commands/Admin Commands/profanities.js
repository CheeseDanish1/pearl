// const {editAutomod} = require('../../Storage/database');

// module.exports.run = async (client, message, args, {GuildConfig}) => {
//   if (!message.member.hasPermission('MANAGE_GUILD'))
//     return message.channel.send(
//       'You do not have permission to use this command'
//     );
//   message.channel.send(
//     `${
//       GuildConfig.automod.profanities ? 'Disabled' : 'Enabled'
//     } swear detection accross the server`
//   );
//   editAutomod(
//     message.guild.id,
//     'profanities',
//     !GuildConfig.automod.profanities
//   );
// };

// module.exports.info = {
//   name: 'Profanities',
//   alias: [],
//   usage: '<p>Profanities',
//   example: '<p>Profanities',
//   description: 'Toggle swear word detection and removal',
//   category: 'moderation',
// };

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
      ? 'Turned off profanity detection'
      : `Users will get \`${newWarnings}\` warnings for swearing`
  );
  editAutomod(message.guild.id, 'profanities', newWarnings);
};

module.exports.info = {
  name: 'Profanities',
  alias: [],
  usage: '<p>Profanities [Warnings to give]',
  example: '<p>Profanities 1',
  description: 'Toggle swear word detection and removal',
  category: 'moderation',
};
