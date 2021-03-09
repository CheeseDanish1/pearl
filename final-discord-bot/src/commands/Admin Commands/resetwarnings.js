const {Message, Client} = require('discord.js');
const GuildMemberConfig = require('../../database/models/GuildMemberConfig')

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(`You need the \`MANAGE_GUILD\` permissions to use this command`);

  const member = message.mentions.members.first()

  if (!member) 
    return message.channel.send('Whos warnings do you want to reset?');

  if (member.user.bot) 
    return message.channel.send('Bots dont have warnings');

  const GuildMember = 
    (await GuildMemberConfig.findOne({id: member.id, guild: message.guild.id})) ||
    (await GuildMemberConfig.create({id: member.id, guild: message.guild.id}))

  await GuildMember.updateOne({"$set": {"warnings.amount": 0, "warnings.info": []}})  
  return message.channel.send(`Reset ${member.displayName} warnings`)

}