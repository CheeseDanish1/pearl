/** @format */

const {Message, Client, MessageEmbed} = require('discord.js');
const allLoggingEvents = require('../../Storage/allLoggingEvents')
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = async (client, message, args, {GuildConfig, prefix}) => {
  const logging = GuildConfig.logging;
  const {events, channel} = logging;

  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  const loggingChannel = message.guild.channels.cache.get(channel);
  const embed = new MessageEmbed()

  const allEvents = allLoggingEvents.map((event, index) => {
    let status = events.find(e => e == event) ? 'enabled' : 'disabled';
    return `Logging for \`${event}\` is **${status}** [${index+1}]`;
  });

  embed.setTitle(`Logging configuration for ${message.guild.name}`);
  embed.setDescription(allEvents.join('\n'));
  embed.setColor('GREEN');
  embed.setFooter(
    loggingChannel
      ? `Logging channel for this server is #${loggingChannel.name}`
      : `There is no logging channel for this server, enable it with the ${prefix}SetChannel command`
  );

  message.channel.send(embed);
  // const enabledEvents = events.map(event => `Logging for \`${event}\` is enabled [${allLoggingEvents.indexOf(event)}]`)
  // const disabledEvents = allLoggingEvents.map(event => {
  //     if (events.find(e => e == event)) return;
  //     return `Logging for \`${event}\` is disabled`
  // })

  //   let prefix = db.fetch(`prefix_${message.guild.id}`);
  //   if (prefix == null) prefix = '>';

  //   if (
  //     !message.member.hasPermission(`MANAGE_CHANNELS`) ||
  //     !message.member.hasPermission(`MANAGE_GUILD`)
  //   )
  //     return message.channel.send(
  //       `sorry, you need manage channels / manage guild permission to use this!`
  //     );
  //   var embed = new Discord.MessageEmbed()
  //     .setAuthor(`help`, message.guild.iconURL)

  //     .setTitle(
  //       `configuration for logging bot in ${message.guild.name}\n----------------------`
  //     )
  //     .setColor('RANDOM');
  //   var y = await db.fetch(`allenabled_${message.guild.id}`);
  //   if (y == 'enabled') {
  //     embed.addField('logging deleted messages [1]', 'enabled');
  //     embed.addField('logging created roles [2]', 'enabled');
  //     embed.addField('logging deleted roles [3]', 'enabled');
  //     embed.addField('logging bulk message deletes [4]', 'enabled');
  //     embed.addField('logging member leaves/user kicks [5]', 'enabled');
  //     embed.addField('logging member joins [6]', 'enabled');
  //     embed.addField('logging guild bans [7]', 'enabled');
  //     embed.addField('logging guild unbans [8]', 'enabled');
  //     embed.addField('logging emoji creations [9]', 'enabled');
  //     embed.addField('logging emoji deletions [10]', 'enabled');
  //     embed.addField('logging channel creations [11]', 'enabled');
  //     embed.addField('logging channel deletions [12]', 'enabled');
  //     embed.addField('logging message edits [13]', 'enabled');
  //     embed.addField('logging emoji updates [14]', 'enabled');
  //     embed.addField(
  //       'logging role adds (when someone gets a role) [15]',
  //       'enabled'
  //     );
  //     embed.addField(
  //       'logging role removes (when someone loses a role) [16]',
  //       'enabled'
  //     );
  //     embed.addField('logging nickname changes [17]', 'enabled');
  //     embed.addField('logging user changes [18]', 'enabled');
  //     embed.addField('logging voice chanel changes [19]', 'enabled');
  //     embed.addField('logging presence changes [20]', 'enabled');
  //     embed.addField('logging message reactions [21]', 'enabled');
  //     embed.addField(
  //       `----------------------`,
  //       `commands: \n\`${prefix}Enable [number]\` - enable the logging for a module\n\`${prefix}Enable all\` - enable all logging modules \n \`${prefix}Disable [number]\` - disable a logging module \n\`${prefix}Disable all\` - disable all logging modules\n \`${prefix}Reset\` - refreshes the bots entire cache for the server; everything set to default, with no logging channel`
  //     );
  //     var x = await db.fetch('loggingchannel_' + message.guild.id);
  //     if (x == null)
  //       embed.addField(
  //         `there is no logging channel set up for this server. to set one up, type:`,
  //         `\`${prefix}SetChannel #channel\``
  //       );
  //     if (x !== null) {
  //       var y = client.channels.cache.get(x);
  //       embed.addField(
  //         `----------------------`,
  //         `logging channel rn is ${y}. to set up another channel, type **${prefix}SetChannel #channel**`
  //       );
  //     }
  //   } else if (y == 'disabled') {
  //     embed.addField('logging deleted messages [1]', 'disabled');
  //     embed.addField('logging created roles [2]', 'disabled');
  //     embed.addField('logging deleted roles [3]', 'disabled');
  //     embed.addField('logging bulk message deletes [4]', 'disabled');
  //     embed.addField('logging member leaves/user kicks [5]', 'disabled');
  //     embed.addField('logging member joins [6]', 'disabled');
  //     embed.addField('logging guild bans [7]', 'disabled');
  //     embed.addField('logging guild unbans [8]', 'disabled');
  //     embed.addField('logging emoji creations [9]', 'disabled');
  //     embed.addField('logging emoji deletions [10]', 'disabled');
  //     embed.addField('logging channel creations [11]', 'disabled');
  //     embed.addField('logging channel deletions [12]', 'disabled');
  //     embed.addField('logging message edits [13]', 'disabled');
  //     embed.addField('logging emoji updates [14]', 'disabled');
  //     embed.addField(
  //       'logging role adds (when someone gets a role) [15]',
  //       'disabled'
  //     );
  //     embed.addField(
  //       'logging role removes (when someone loses a role) [16]',
  //       'disabled'
  //     );
  //     embed.addField('logging nickname changes [17]', 'disabled');
  //     embed.addField('logging user changes [18]', 'disabled');
  //     embed.addField('logging voice chanel changes [19]', 'disabled');
  //     embed.addField('logging presence changes [20]', 'disabled');
  //     embed.addField('logging message reactions [21]', 'disabled');
  //     embed.addField(
  //       `----------------------`,
  //       `commands: \n\`${prefix}Enable [number]\` - enable the logging for a module\n\`${prefix}Enable all\` - enable all logging modules \n \`${prefix}Disable [number]\` - disable a logging module \n\`${prefix}Disable all\` - disable all logging modules\n \`${prefix}Reset\` - refreshes the bots entire cache for the server; everything set to default, with no logging channel`
  //     );
  //     var x = await db.fetch('loggingchannel_' + message.guild.id);
  //     if (x == null)
  //       embed.addField(
  //         `there is no logging channel set up for this server. to set one up, type:`,
  //         `\`${prefix}SetChannel #channel\``
  //       );
  //     if (x !== null) {
  //       var y = client.channels.cache.get(x);
  //       embed.addField(
  //         `----------------------`,
  //         `logging channel rn is ${y}. to set up another channel`,
  //         `type **${prefix}SetChannel #channel**`
  //       );
  //     }
  //   } else {
  //     var x = await db.fetch('messagedelete_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging deleted messages [1]', 'disabled');
  //     } else {
  //       embed.addField('logging deleted messages [1]', 'enabled');
  //     }
  //     var x = await db.fetch('rolecreate_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging created roles [2]', 'disabled');
  //     } else {
  //       embed.addField('logging created roles [2]', 'enabled');
  //     }
  //     var x = await db.fetch('roledelete_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging deleted roles [3]', 'disabled');
  //     } else {
  //       embed.addField('logging deleted roles [3]', 'enabled');
  //     }
  //     var x = await db.fetch('messagebulkdelete_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging bulk message deletes [4]', 'disabled');
  //     } else {
  //       embed.addField('logging bulk message deletes [4]', 'enabled');
  //     }
  //     var x = await db.fetch('guildmemberremove_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging member leaves/user kicks [5]', 'disabled');
  //     } else {
  //       embed.addField('logging member leaves/user kicks [5]', 'enabled');
  //     }
  //     var x = await db.fetch('guildmemberadd_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging member joins [6]', 'disabled');
  //     } else {
  //       embed.addField('logging member joins [6]', 'enabled');
  //     }
  //     var x = await db.fetch('guildbanadd_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging guild bans [7]', 'disabled');
  //     } else {
  //       embed.addField('logging guild bans [7]', 'enabled');
  //       if (
  //         'I am just doing this so that I look busy when my parents come through' ==
  //         true
  //       )
  //         return mother.ask('Are you reading this');
  //     }
  //     var x = await db.fetch('guildbanremove_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging guild unbans [8]', 'disabled');
  //     } else {
  //       embed.addField('logging guild unbans [8]', 'enabled');
  //     }
  //     var x = await db.fetch('emojicreate_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging emoji creations [9]', 'disabled');
  //     } else {
  //       embed.addField('logging emoji creations [9]', 'enabled');
  //     }
  //     var x = await db.fetch('emojidelete_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging emoji deletions [10]', 'disabled');
  //     } else {
  //       embed.addField('logging emoji deletions [10]', 'enabled');
  //     }
  //     var x = await db.fetch('channelcreate_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging channel creations [11]', 'disabled');
  //     } else {
  //       embed.addField('logging channel creations [11]', 'enabled');
  //     }
  //     var x = await db.fetch('channeldelete_' + message.guild.id);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging channel deletions [12]', 'disabled');
  //     } else {
  //       embed.addField('logging channel deletions [12]', 'enabled');
  //     }
  //     var x = await db.fetch(`messageedit_${message.guild.id}`);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging message edits [13]', 'disabled');
  //     } else {
  //       embed.addField('logging message edits [13]', 'enabled');
  //     }
  //     var x = await db.fetch(`emojiupdate_${message.guild.id}`);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging emoji update [14]', 'disabled');
  //     } else {
  //       embed.addField('logging emoji update [14]', 'enabled');
  //     }
  //     var x = await db.fetch(`roleadd_${message.guild.id}`);
  //     if (x == null || x == 'disabled') {
  //       embed.addField(
  //         'logging role adds (when someone gets a role) [15]',
  //         'disabled'
  //       );
  //     } else {
  //       embed.addField(
  //         'logging role adds (when someone gets a role) [15]',
  //         'enabled'
  //       );
  //     }
  //     var x = await db.fetch(`roleremove_${message.guild.id}`);
  //     if (x == null || x == 'disabled') {
  //       embed.addField(
  //         'logging role removes (when someone loses a role) [16]',
  //         'disabled'
  //       );
  //     } else {
  //       embed.addField(
  //         'logging role removes (when someone loses a role) [16]',
  //         'enabled'
  //       );
  //     }
  //     var x = await db.fetch(`nickchange_${message.guild.id}`);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging name changes [17]', 'disabled');
  //     } else {
  //       embed.addField('logging name changes[17]', 'enabled');
  //     }
  //     var x = await db.fetch(`userchange_${message.guild.id}`);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging user changes [18]', 'disabled');
  //     } else {
  //       embed.addField('logging user changes [18]', 'enabled');
  //     }
  //     var x = await db.fetch(`voicechange_${message.guild.id}`);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging voice chanel changes [19]', 'disabled');
  //     } else {
  //       embed.addField('logging voice chanel changes [19]', 'enabled');
  //     }
  //     var x = await db.fetch(`preschange_${message.guild.id}`);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging presence changes [20]', 'disabled');
  //     } else {
  //       embed.addField('logging presence changes [20]', 'enabled');
  //     }
  //     var x = await db.fetch(`mesreaction_${message.guild.id}`);
  //     if (x == null || x == 'disabled') {
  //       embed.addField('logging message reactions [21]', 'disabled');
  //     } else {
  //       embed.addField('logging message reactions [21]', 'enabled');
  //     }

  //     embed.addField(
  //       `----------------------`,
  //       `commands: \n\`${prefix}Enable [number]\` - enable the logging for a module\n\`${prefix}Enable all\` - enable all logging modules \n \`${prefix}Disable [number]\` - Disable a logging module \n\`${prefix}Disable all\` - Disable all logging modules\n \`${prefix}Reset\` - refreshes the bots entire cache for the server; everything set to default, with no logging channel`
  //     );
  //     var x = await db.fetch('loggingchannel_' + message.guild.id);
  //     if (x == null)
  //       embed.addField(
  //         `there is no logging channel set up for this server. to set one up, type:`,
  //         `\`${prefix}SetChannel #channel\``
  //       );
  //     if (x !== null) {
  //       var y = client.channels.cache.get(x);
  //       embed.addField(
  //         `----------------------`,
  //         `logging channel rn is ${y}. to set up another channel, type **${prefix}SetChannel #channel**`
  //       );
  //     }
  //   }
  //   message.channel.send(embed);
};
