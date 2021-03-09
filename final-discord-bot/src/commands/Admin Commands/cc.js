/** @format */

const {Client, Message, Guild} = require('discord.js');
const GuildConfigs = require('../../database/models/GuildConfig');

/**
 *
 * @param {Client} bclient
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (bclient, message, args, ops) => {
  const {GuildConfig} = ops;
  // const GuildConfig = await GuildConfigs.findOne({id: ''});
  // console.log(GuildConfig)
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

  // GuildConfig.collection.findOneAndUpdate({"customCommands.content": cc.content})

  if (GuildConfig.customCommands.find(c => c.command == cc.command)) {
    console.log('Ran');
    await GuildConfig.updateOne({
      $pull: {
        customCommands: {
          command: cc.command,
        },
      },
    });
    await GuildConfig.updateOne({
      $push: {
        customCommands: cc,
      },
    });
    return;
  }

  await GuildConfig.updateOne({
    $push: {
      customCommands: cc,
    },
  });

  // let res = new cc({
  //   Guild: message.guild.id,
  //   Command: args[0].toLowerCase(),
  //   Content: args.slice(1).join(' '),
  // });

  // const collection = res.collection;

  // // console.log(collection.name)d

  // const exists = await collection.findOne({
  //   Guild: res.Guild,
  //   Command: res.Command,
  // });

  // if (!!exists) {
  //   collection.updateOne(
  //     {
  //       Guild: res.Guild,
  //       Command: res.Command.toLowerCase(),
  //     },
  //     {
  //       $set: {
  //         Content: res.Content,
  //       },
  //     }
  //   );
  // } else {
  //   res.save();
  // }

  message.channel.send('Success :smile:');
};
