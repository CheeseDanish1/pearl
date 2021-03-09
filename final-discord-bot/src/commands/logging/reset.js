/** @format */
const GuildConfigs = require("../../database/models/GuildConfig")

module.exports.run = async (client, message, args, {GuildConfig}) => {
    if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send("You need the manage guild permission to use this command")

    await GuildConfig.updateOne({"$unset": {"logging.channel": ""}})
    await GuildConfig.updateOne({"$set": {"logging.events": []}})

    return message.channel.send("Reset the logging configuration for this server")
//   let prefix = db.fetch(`prefix${message.guild.id}`);
//   if (prefix == null) prefix = '>';

//   if (!message.guild) return message.reply('use this command in a server pls');
//   if (
//     !message.member.hasPermission(`MANAGE_CHANNELS`) ||
//     !message.member.hasPermission(`MANAGE_GUILD`)
//   )
//     return message.channel.send(
//       `sorry, you need manage channels / manage guild permission to use this!`
//     );
//   await db.delete(`loggingchannel_${message.guild.id}`);
//   await db.delete(`allenabled_${message.guild.id}`);
//   await db.delete(`messagedelete_${message.guild.id}`);
//   await db.delete('rolecreate_' + message.guild.id);
//   await db.delete('roledelete_' + message.guild.id);
//   await db.delete('messagebulkdelete_' + message.guild.id);
//   await db.delete('guildmemberremove_' + message.guild.id);
//   await db.delete('guildmemberadd_' + message.guild.id);
//   await db.delete('guildbanadd_' + message.guild.id);
//   await db.delete('guildbanremove_' + message.guild.id);
//   await db.delete('emojicreate_' + message.guild.id);
//   await db.delete('emojidelete_' + message.guild.id);
//   await db.delete('channelcreate_' + message.guild.id);
//   await db.delete('channeldelete_' + message.guild.id);
//   await db.delete('messageedit_' + message.guild.id);
//   await db.delete(`emojiupdate_${message.guild.id}`);
//   await db.delete(`roleadd_${message.guild.id}`);
//   await db.delete(`roleremove_${message.guild.id}`);
//   await db.delete(`nickchange_${message.guild.id}`);
//   await db.delete(`userchange_${message.guild.id}`);
//   await db.delete(`voicechange_${message.guild.id}`);
//   await db.delete(`preschange_${message.guild.id}`);
//   await db.delete(`mesreaction_${message.guild.id}`);

//   message.channel.send(
//     `done, reset all logging info for this server. type \`${prefix}LoggingHelp\` to setup again.`
//   );
};
