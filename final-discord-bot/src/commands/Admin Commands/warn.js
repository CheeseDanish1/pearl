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
    return message.channel.send(
      'Please mention the person to who you want to warn - warn @mention <reason>'
    );
  

  if (member.user.bot) 
    return message.channel.send('You can not warn bots');
    
  if (message.author.id === member.id) 
    return message.channel.send('You can not warn yourself');

  if (member.id === message.guild.owner.id) 
    return message.channel.send('You jerk, how can you warn server owner -_-');
  
  const reason = args.slice(1).join(' ');

  if (!reason) 
    return message.channel.send(
      'Please provide reason to warn - warn @mention <reason>'
    );
  
  const GuildMember = 
    (await GuildMemberConfig.findOne({id: member.id, guild: message.guild.id})) ||
    (await GuildMemberConfig.create({id: member.id, guild: message.guild.id}))


  const warns = GuildMember.warnings || []
  const amount = warns.amount || 0
  // const currentWarning = warns.info.find(w => w.warning == amount)
  
  if (amount == 3) {
    return message.channel.send(`${member.displayName} already reached their limit of 3 warnings`)
  }

  await GuildMember.updateOne({
    $inc: {"warnings.amount": 1}, 
    $push: {
      "warnings.info": {
        warning: amount+1, warnedBy: message.author.id, reason
      }
    }
  })

  member.send(
    `You have been warned in **${message.guild.name}** for **${reason}**`
  );
  return message.channel.send(
    `You warned **${member.user.username}** for **${reason}**, they now have **${amount+1}** warning`
  );
};
