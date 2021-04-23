const {MessageEmbed, Message} = require('discord.js');
const pms = require('pretty-ms');

/**
 *
 * @param {Message} message
 */

module.exports.run = async (client, message, args, {GuildConfig}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      "You don't have permission to use this command"
    );

  const giveaways = GuildConfig.giveaways;

  const embed = new MessageEmbed()
    .setTitle(`All Giveaways`)
    .setAuthor(
      message.author.username,
      message.author.avatarURL({dynamic: true})
    )
    // .setImage(message.guild.iconURL({dynamic: true}));
    .setColor('GREEN');

  if (!giveaways || giveaways.length == 0) {
    embed.setDescription(`There are no giveaways on this server`);
  } else {
    giveaways.forEach(giveaway => {
      embed.addField(
        `Id: ${giveaway.mes}`,
        `Channel: ${message.guild.channels.cache
          .get(giveaway.channel)
          .toString()}
         Prize: \`${giveaway.prize}\`
         ${
           giveaway.ended ? 'Ended' : 'Ends'
         }: \`${giveaway.ends.toLocaleString()}\`
         Length: \`${pms(parseInt(giveaway.length), {verbose: true})}\`
         ${
           giveaway.ended
             ? `Ended: \`true\`\n${
                 giveaway.winner.username
                   ? message.guild.members.cache.get(giveaway.winner.id)
                     ? `Winner: <@${giveaway.winner.id}>`
                     : `\`${giveaway.winner.username}\``
                   : ``
               }`
             : ``
         }`,
        true
      );
    });
  }

  message.channel.send(embed);
};

module.exports.info = {
  name: 'giveawaylist',
  alias: ['glist'],
  usage: '<p>GiveawayList',
  example: '<p>GiveawayList',
  description: 'Lists all giveaways',
  category: 'admin',
};
