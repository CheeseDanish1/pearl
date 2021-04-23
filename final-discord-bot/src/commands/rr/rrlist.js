const {Message, MessageEmbed} = require('discord.js');

/**
 *
 * @param {Message} message
 */

module.exports.run = (client, message, args, {GuildConfig}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  const embed = new MessageEmbed()
    .setTitle(`Reaction Role Menu`)
    .setColor('GREEN')
    .setAuthor(
      message.author.username,
      message.author.avatarURL({dynamic: true})
    );
  const rr = GuildConfig.reactionRoles;
  if (!rr || !rr.length)
    embed.setDescription(`There are no reaction roles on this server`);
  else {
    rr.forEach(r => {
      const c = message.guild.channels.cache.get(r.Channel);
      const ro = message.guild.roles.cache.get(r.Role);
      embed.addField(
        `Id: ${r.MessageId}`,
        `Channel: ${c ? c.toString() : 'Deleted'}
         Role: ${ro ? ro.toString() : 'Deleted'}
         Reaction: ${r.Reaction}
         [Link](https://discord.com/channels/${message.guild.id}/${r.Channel}/${
          r.MessageId
        })`,
        true
      );
    });
  }

  message.channel.send(embed);
};

module.exports.info = {
  name: 'rrlist',
  alias: ['reactionrolelist'],
  usage: '<p>Rrlist',
  example: '<p>Rrlist',
  description: 'List servers reaction roles',
  category: 'admin',
};
