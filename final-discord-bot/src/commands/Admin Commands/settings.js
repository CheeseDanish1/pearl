const {Message, MessageEmbed} = require('discord.js');
const ms = require('ms');

/**
 *
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = (client, message, args, {GuildConfig, prefix}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      `You dont have permission to view the servers settings`
    );

  const p = d =>
    d
      .split(' ')
      .map(f => f[0].toUpperCase() + f.toLowerCase().substring(1))
      .join(' ');

  const disabledCommands = GuildConfig.disabledCommands.length
    ? GuildConfig.disabledCommands.map(d => `\`${d}\``).join(', ')
    : '`None`';

  const disabledCategories = GuildConfig.disabledCategories.length
    ? GuildConfig.disabledCategories.map(d => `\`${d}\``).join(', ')
    : '`None`';

  const autorole = GuildConfig.autorole.length
    ? GuildConfig.autorole.map(
        d => message.guild.roles.cache.get(d).toString() || '`Error`'
      )
    : '`None`';

  const ignoredPeople = GuildConfig.ignoredStuff.people.length
    ? GuildConfig.ignoredStuff.people.map(r =>
        message.guild.members.cache.get(r).toString()
      )
    : '`None`';

  const ignoredRoles = GuildConfig.ignoredStuff.roles.length
    ? GuildConfig.ignoredStuff.roles.map(
        r => message.guild.roles.cache.get(r).toString() || 'Error'
      )
    : '`None`';

  const ignoredChannels = GuildConfig.ignoredStuff.channels.length
    ? GuildConfig.ignoredStuff.channels.map(
        r => message.guild.channels.cache.get(r).toString() || 'Error'
      )
    : '`None`';

  const Punishments = GuildConfig.automod.punishments.length
    ? GuildConfig.automod.punishments
        .sort((a, b) => a.strike - b.strike)
        .map(
          pun =>
            `\`${pun.strike}\`: **${p(pun.action)}** ${
              pun.time ? ms(pun.time, {long: true}) : ''
            }`
        )
    : 'None';

  const Zalgo =
    GuildConfig.automod.zalgo && GuildConfig.automod.zalgo != 0
      ? GuildConfig.automod.zalgo
      : 'Disabled';

  const Profanity =
    GuildConfig.automod.profanities && GuildConfig.automod.profanities != 0
      ? GuildConfig.automod.profanities
      : 'Disabled';

  const Thresh =
    GuildConfig.automod.mentions && GuildConfig.automod.mentions.max
      ? GuildConfig.automod.mentions.max
      : 'None';

  const Warnings =
    GuildConfig.automod.mentions && GuildConfig.automod.mentions.warnings
      ? GuildConfig.automod.mentions.warnings
      : 'None';

  const Invites =
    GuildConfig.automod.invite && GuildConfig.automod.invite != 0
      ? GuildConfig.automod.invite
      : 'None';

  const AdminOnly = !!GuildConfig.automod.adminOnly ? 'Enabled' : 'Disabled';

  const Percent =
    GuildConfig.automod.caps &&
    GuildConfig.automod.caps.percent &&
    GuildConfig.automod.caps.warnings
      ? GuildConfig.automod.caps.percent
      : `None`;

  const CapsWarnings =
    GuildConfig.automod.caps &&
    GuildConfig.automod.caps.percent &&
    GuildConfig.automod.caps.warnings
      ? GuildConfig.automod.caps.warnings
      : `None`;

  const embed = new MessageEmbed()
    .setTitle(`${p(message.guild.name)}'s Settings`)
    .addField(
      `General`,
      `\nPrefix: \`${prefix}\`
       Disabled Commands: ${disabledCommands}
       Disabled Categories: ${disabledCategories}
       Autorole: ${autorole}
       Ignored Members: ${ignoredPeople}
       Ignored Roles: ${ignoredRoles}
       Ignored Channels: ${ignoredChannels}
       `,
      true
    )
    // .addField(
    //   `Logging`,
    //   `\n\nChannel: ${channel}
    //   ${loggingEvents}`,
    //   true
    // )
    // .addField(`\u200b`, `\u200b`, true)
    .addField(`Punishments`, Punishments, true)
    .addField(
      `Automod`,
      `__Mass Mentions__
      Threshhold: \`${Thresh}\`
      Warnings: \`${Warnings}\`

      __Cap Spam__
      Percent: \`${Percent}%\`
      Warnings: \`${CapsWarnings}\`

      Zalgo: \`${Zalgo}\`
      Profanity: \`${Profanity}\`
      Admin Only: \`${AdminOnly}\`
      Invite Removal: \`${Invites}\``,
      true
    );

  message.channel.send(embed);
};

module.exports.info = {
  name: 'settings',
  alias: ['setting'],
  usage: '<p>Settings',
  example: '<p>Settings',
  description: 'View your servers configuration and settings',
  category: 'moderation',
};
