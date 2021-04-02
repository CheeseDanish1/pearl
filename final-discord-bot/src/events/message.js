/** @format */

const {
  onMes,
  automod,
  getMostLikely,
  mesPingsAfk,
} = require('../Storage/functions');
const {Client, Message, MessageEmbed} = require('discord.js');
const {
  getUser,
  getGuild,
  getGuildMember,
  removeAfk,
} = require('../Storage/database');

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message) => {
  //Leave's if you are in a DM Or if the bot sends a message or if they have admin only mode set to true
  if (message.guild === null || message.author.bot) return;
  const [Guild, GuildMember, User] = await Promise.all([
    getGuild(message.guild.id),
    getGuildMember(message.member.id, message.guild.id),
    getUser(message.author),
  ]);

  if (!Guild || !User || !GuildMember)
    return message.channel.send('Unknown error');

  //Get's the prefix the user set.
  let prefix = Guild.prefix || '>';

  if (message.content.toLowerCase() == 'prefix')
    return message.channel.send(
      `${message.guild.name}s prefix is **${prefix}**`
    );

  const res = automod({Guild, message, GuildMember});
  if (res == 'return') return;

  await onMes(GuildMember);

  // Check if they ping someone who is afk
  const pingsAfk = await mesPingsAfk(message, prefix);
  if (pingsAfk)
    message.channel.send(
      new MessageEmbed()
        .setTitle(`**${pingsAfk.user.username}** is currently afk`)
        .addFields(
          {name: 'Afk Message', value: pingsAfk.status.message},
          {
            name: 'Afk For',
            value: `${require('ms')(new Date() - pingsAfk.status.timestamp, {
              long: true,
            })}`,
          }
        )
        .setColor('RED')
    );

  // Check if they were afk
  if (GuildMember.afk && GuildMember.afk.status) {
    message.channel.send(
      new MessageEmbed()
        .setTitle(`You're no longer afk!`)
        .setDescription(
          `You were afk for **${require('ms')(
            new Date() - GuildMember.afk.timestamp,
            {long: true}
          )}** doing **${GuildMember.afk.message}**`
        )
        .setColor('GREEN')
    );
    removeAfk(message.member.id, message.guild.id);
  }

  //Return's if the message does not start with the set prefix
  if (
    !message.content.startsWith(prefix) ||
    message.content.startsWith(prefix + ' ')
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    [...client.commands.entries()]
      .map(r => r[1])
      .find(r => r.info.alias.includes(command));
  const allCmds = [...client.commands.entries()].map(a => a[0].toLowerCase());

  if (!cmd)
    return message.channel.send(
      `That command does not exist, did you mean ${(
        await getMostLikely(command, allCmds)
      )
        .slice(0, 1)
        .map(r => `\`${prefix + r[0]}\``)
        .join(', ')}`
    );

  if (
    Guild.disabledCommands.includes(cmd.info.name) &&
    !message.member.hasPermission('MANAGE_GUILD')
  )
    return message.channel.send(`That command has been disabled`);

  const options = {
    GuildConfig: Guild,
    GuildMemberConfig: GuildMember,
    UserConfig: User,
    prefix,
  };

  cmd.run(client, message, args, options);
  await User.updateOne({
    $set: {lastCmdRanDate: Date.now(), lastCmdRanName: command},
  });
  return;
};
