const {MessageEmbed, GuildMember, Client} = require('discord.js');
const {getGuild} = require('../Storage/database');

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

  const Guild = await getGuild(id);

  let roles = Guild.autorole;
  if (roles.length > 0) {
    roles.forEach(r => {
      const role = member.guild.roles.cache.get(r);
      member.roles.add(role);
    });
  }

  let welcome = Guild.welcome;
  if (welcome.message && welcome.channel) {
    // Curr guild invites
    const invites = await guild.fetchInvites();

    // Old // Cached guild invites
    const oldInvites = client.invites.get(guild.id);

    // Updating cache
    client.invites.set(guild.id, invites);

    // Find the invite that has les invites then now
    const invite = invites.find(i => oldInvites.get(i.code).uses < i.uses);

    // Replace ops in set message
    const mess = welcome.message
      .replace(/{mention}/, member.toString())
      .replace(/{username}/, member.user.username)
      .replace(/{mc}/, guild.memberCount)
      .replace(/{server}/, guild.name)
      .replace(/{inviter}/, `<@${invite.inviter.id}>`)
      .replace(/{invitername}/, invite.inviter.username)
      .replace(/{inviterName}/, invite.inviter.username)
      .replace(/{InviterName}/, invite.inviter.username)
      .replace(/{Invitername}/, invite.inviter.username);

    // If dm is true, dm user message
    if (welcome.dm) {
      member.send(mess);
    }
    const channel = guild.channels.cache.get(welcome.channel);
    if (!channel) return;
    channel.send(mess);
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
