const {MessageEmbed, GuildMember, Client} = require('discord.js');
const GuildConfig = require('../database/models/GuildConfig');

/**
 *
 * @param {Client} client
 * @param {GuildMember} member
 */

module.exports = async (client, member) => {
  console.log(
    `User ${member.user.username} has joined Server: ${member.guild.name} `
  );
  const {guild} = member;
  const {id} = guild;

  const Guild =
    (await GuildConfig.findOne({id})) || (await GuildConfig.create({id}));

  let roles = Guild.autorole;
  if (roles.length > 0) {
    console.log(roles);
    roles.forEach(r => {
      const role = member.guild.roles.cache.get(r);
      member.roles.add(role);
    });
  }

  if (!Guild.logging.channel) return;
  if (!Guild.logging.events.find(e => e == 'Member joins')) return;
  const loggingChannel = guild.channels.cache.get(Guild.logging.channel);
  if (!loggingChannel) return;

  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('User Join', member.guild.iconURL)
    .addField('User Tag', member.user.tag)
    .addField('User Id', member.user.id + `\n**----------------------**`)
    .setTimestamp();
  loggingChannel.send(embed).catch();
};
