/** @format */

const {Client, Message, Guild} = require('discord.js');

/**
 *
 * @param {Client} bclient
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (bclient, message, args, {GuildConfig}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');
  if (!args[0])
    return message.channel.send('Please provide parameters for this command');
  if (!args[1])
    return message.channel.send(
      'Pleas provide the content for the custom command'
    );

  const cc = {
    command: args[0].toLowerCase(),
    content: args.slice(1).join(' '),
  };

  if (GuildConfig.customCommands.find(c => c.command == cc.command)) {
    await GuildConfig.updateOne(
      {$set: {'customCommands.$[c]': cc}},
      {arrayFilters: [{'c.command': cc.command}]}
    );
    return message.channel.send(`Success :smile:`);
  }

  await GuildConfig.updateOne({
    $push: {
      customCommands: cc,
    },
  });

  message.channel.send('Success :smile:');
};

module.exports.info = {
  name: 'cc',
  alias: ['customcommand', 'customcomand'],
  usage: '<p>cc [command] [content]',
  example:
    '<p>cc Info This server is about praising our one and only god. Zordon',
  description: 'Set a custom text trigger for the bot to respond to',
  category: 'admin',
};
