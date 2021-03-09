const GuildConfig = require('../../database/models/GuildConfig');
const {Message} = require('discord.js');

/**
 *
 * @param {Message} message
 */

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  const Guild = await GuildConfig.findOne({id: message.guild.id})

  let zal = Guild.ops.zalgo

  if (zal) {
    // db.set(`zal_${message.guild.id}`, false)
    await Guild.updateOne({"ops.zalgo": false})
    return message.channel.send('Turned zalgo detection off for this guild');
  } else {
    // db.set(`zal_${message.guild.id}`, true)
    await Guild.updateOne({"ops.zalgo": true})
    return message.channel.send('Turned zalgo detection on for this guild');
  }
};
