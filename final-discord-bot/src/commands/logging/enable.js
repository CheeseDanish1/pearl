/** @format */

const allLoggingEvents = require('../../Storage/allLoggingEvents')

module.exports.run = async (client, message, args, {GuildConfig, prefix}) => {

  if (!message.member.hasPermission(`MANAGE_GUILD`))
    return message.channel.send(`You need the manage guild permission to use this command`);

  const loggingChannel = GuildConfig.logging.channel
  if (!loggingChannel) 
    return message.channel.send(`You dont have a logging channel set up for this server\nType ${prefix}SetChannel \`#channel\` to set a channel`);


  const num = args[0]
  if (!num)
    return message.channel.send(`You need to specify which logging event you want to enable by its number\nUse ${prefix}LoggingHelp for more info`);

  if (num != "all" && parseInt(num) != num) 
    return message.channel.send(`What you provide must be a number\nType \`${prefix}LoggingHelp\` for more info`)

  if (num != "all" && num > 20 || num < 1)
    return message.channel.send(`Type \`${prefix}LoggingHelp\` and find the number with what event you want to enable logging for`);

  if (num == "all") {
    await GuildConfig.updateOne({"$set": {"logging.events": allLoggingEvents}})
    return message.channel.send("Enabled logging for all events")
  }

  const event = allLoggingEvents[num-1]

  if (GuildConfig.logging.events.find(e => e == event)) 
    return message.channel.send(`Logging for \`${event}\` is already enabled`)

  await GuildConfig.updateOne({"$push": {"logging.events": event}})

  return message.channel.send(`Enabled logging for \`${event}\``)

//   let prefix = db.fetch(`prefix${message.guild.id}`);
//   if (prefix == null) prefix = '>';

//   if (!message.guild) return message.reply('use this command in a server pls');
//   if (
//     !message.member.hasPermission(`MANAGE_CHANNELS`) ||
//     !message.member.hasPermission(`MANAGE_GUILD`)
//   )
//     return message.channel.send(`sorry, you need manage channels / manage guild permission to use this!`);

//   if (!args[0])
//     return message.channel.send(`you need to specify a number with the event u want to log. type \`${prefix}LogginHelp\``);

//   var x = await db.get('loggingchannel_' + message.guild.id);
//   if (x == null || x == 'none') 
//     return message.channel.send(`you haven't set up a logging channel for this guild. type \`${prefix}LoggingHelp\``);

//   if (args[0] > 21 || args[0] < 1)
//     return message.reply(`type \`${prefix}LoggingHelp\` and find the number with what event u want to enable logging for`);

//   switch (args[0]) {
//     case '1':
//       await db.set(`messagedelete_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for deleted messages`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '2':
//       await db.set(`rolecreate_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for created roles`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '3':
//       await db.set(`roledelete_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for deleted roles`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '4':
//       await db.set(`messagebulkdelete_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for message bulk deletes`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '5':
//       await db.set(`guildmemberremove_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging member leaves/user kicks`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '6':
//       await db.set(`guildmemberadd_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for new members`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '7':
//       await db.set(`guildbanadd_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging banned users`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '8':
//       await db.set(`guildbanremove_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging unbanned users`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '9':
//       await db.set(`emojicreate_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for emoji creations`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '10':
//       await db.set(`emojidelete_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for emoji deletions`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '11':
//       await db.set(`channelcreate_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for channel creations`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '12':
//       await db.set(`channeldelete_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for channel deletions`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '13':
//       await db.set(`messageedit_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for message edits`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '14':
//       await db.set(`emojiupdate_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for emoji updates`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '15':
//       await db.set(`roleadd_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for when some gets a role`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '16':
//       await db.set(`roleremove_${message.guild.id}`, 'enabled');
//       message.channel.send(
//         `ok, enabled the logging for when someone loses a role`
//       );
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '17':
//       await db.set(`nickchange_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for nickname changes`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '18':
//       await db.set(`userchange_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for user changes`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '19':
//       await db.set(`voicechange_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for voice changes`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '20':
//       await db.set(`preschange_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled the logging for presence changes`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case '21':
//       await db.set(`mesreaction_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok, enabled logging of message reactions`);
//       await db.delete(`allenabled_${message.guild.id}`);
//       break;
//     case 'all':
//       await db.set(`allenabled_${message.guild.id}`, 'enabled');
//       await db.set('rolecreate_' + message.guild.id, 'enabled');
//       await db.set(`messagedelete_${message.guild.id}`, 'enabled');
//       await db.set('roledelete_' + message.guild.id, 'enabled');
//       await db.set('messagebulkdelete_' + message.guild.id, 'enabled');
//       await db.set('guildmemberremove_' + message.guild.id, 'enabled');
//       await db.set('guildmemberadd_' + message.guild.id, 'enabled');
//       await db.set('guildbanadd_' + message.guild.id, 'enabled');
//       await db.set('guildbanremove_' + message.guild.id, 'enabled');
//       await db.set('emojicreate_' + message.guild.id, 'enabled');
//       await db.set('emojidelete_' + message.guild.id, 'enabled');
//       await db.set('channelcreate_' + message.guild.id, 'enabled');
//       await db.set('channeldelete_' + message.guild.id, 'enabled');
//       await db.set(`messageedit_${message.guild.id}`, 'enabled');
//       await db.set(`emojiupdate_${message.guild.id}`, 'enabled');
//       await db.set(`roleadd_${message.guild.id}`, 'enabled');
//       await db.set(`roleremove_${message.guild.id}`, 'enabled');
//       await db.set(`nickchange_${message.guild.id}`, 'enabled');
//       await db.set(`userchange_${message.guild.id}`, 'enabled');
//       await db.set(`voicechange_${message.guild.id}`, 'enabled');
//       await db.set(`preschange_${message.guild.id}`, 'enabled');
//       await db.set(`mesreaction_${message.guild.id}`, 'enabled');
//       message.channel.send(`ok enabled logging for all events in this guild`);
//   }
};
