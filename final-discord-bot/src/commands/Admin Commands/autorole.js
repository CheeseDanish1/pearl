/** @format */

const {MessageEmbed} = require('discord.js');
const {
  resetAutorole,
  insertAutorole,
  removeAutorole,
} = require('../../Storage/database');

module.exports.run = async (client, message, args, ops) => {
  let {prefix} = ops;
  if (!message.member.hasPermission('MANAGE_ROLES'))
    return message.channel.send(
      'You do not have permission to use this command'
    );
  if (!message.guild.me.hasPermission('MANAGE_ROLES'))
    return message.channel.send('I do not have permission to use this command');

  const Guild = ops.GuildConfig;
  const autorole = Guild.autorole;

  if (args[0]) {
    switch (args[0].toLowerCase()) {
      case 'reset':
        message.channel.send('Reset the autorole for this server');
        resetAutorole(message.guild.id);
        break;

      case 'info':
        message.channel.send(
          `The autorole for this server is ${
            !Guild.autorole.length
              ? '**None**'
              : `**${Guild.autorole
                  .map(c => {
                    let role = message.guild.roles.cache.get(c);
                    return role ? role.name : '';
                  })
                  .join(', ')}**`
          }`
        );
        break;

      case 'remove':
        let role =
          message.mentions.roles.first() ||
          message.guild.roles.cache.get(args[1]);
        if (!role)
          return message.channel.send(
            'Please mention the role you want to remove'
          );

        if (!autorole.includes(role.id))
          return message.channel.send(
            'The auto role for the guild does not includes ' + role.name
          );

        message.channel.send(
          `Removed role **${
            role.name
          }**.\nThe autorole for this server is now ${
            !newGuild.autorole.length
              ? '**None**'
              : `**${newGuild.autorole
                  .map(c => {
                    role = message.guild.roles.cache.get(c);
                    return role ? role.name : '';
                  })
                  .join(', ')}**`
          }`
        );
        removeAutorole(message.guild.id, role.id);
        break;
      case 'add':
        let role2 =
          message.mentions.roles.first() ||
          message.guild.roles.cache.get(args[1]);
        if (!role2)
          return message.channel.send(
            'Please mention the role you want to add'
          );

        if (
          role2.comparePositionTo(
            message.guild.roles.cache.find(
              r => r.name.toLowerCase() == client.user.username.toLowerCase()
            )
          ) > 0
        )
          return message.channel.send(
            'I dont have permission to give out that role. To fix this, make sure that the pearl role is higher than the role you are trying to add.'
          );

        if (autorole.includes(role2.id))
          return message.channel.send(
            `That role is already in the autorole for this server`
          );

        message.channel.send(
          `Added role **${
            role2.name
          }**.\nThe autorole for this server is now **${newGuild2.autorole
            .map(c => {
              roleFull = message.guild.roles.cache.get(c);
              return roleFull ? roleFull.name : '';
            })
            .join(', ')}**`
        );
        insertAutorole(message.guild.id, role2.id);

        break;
      case 'help':
        let p = prefix;

        const _ = new MessageEmbed()
          .setTitle(`${p}AutoRole command`)
          .addField(
            `Example`,
            `\`${p}AutoRole @Member\` Gives a new member the @Member role`
          )
          .addField(`Usage`, `\`${p}AutoRole [Addition Info] [Role]\``)
          .addField(`${p}AutoRole Info`, `Gives you the current autoroles set`)
          .addField(`${p}AutoRole Reset`, `Resets the list of roles`)
          .addField(`${p}AutoRole Help`, `Shows you this menu`)
          .addField(`${p}AutoRole Remove <Role>`, `Remove a role from the list`)
          .addField(`${p}AutoRole Add <Role>`, `Adds a role to the list`)
          .setColor('GREEN');

        message.channel.send(_);
        break;
      default:
        let pr = prefix;

        const __ = new MessageEmbed()
          .setTitle(`${pr}AutoRole command`)
          .addField(
            `Example`,
            `\`${pr}AutoRole @Member\` Gives a new member the @Member role`
          )
          .addField(`Usage`, `\`${pr}AutoRole [Addition Info] [Role]\``)
          .addField(`${pr}AutoRole Info`, `Gives you the current autoroles set`)
          .addField(`${pr}AutoRole Reset`, `Resets the list of roles`)
          .addField(`${pr}AutoRole Help`, `Shows you this menu`)
          .addField(
            `${pr}AutoRole Remove <Role>`,
            `Remove a role from the list`
          )
          .addField(`${pr}AutoRole Add <Role>`, `Adds a role to the list`)
          .setColor('GREEN');

        message.channel.send(__);
        break;
    }
  } else {
    let p = prefix;

    const _ = new MessageEmbed()
      .setTitle(`${p}AutoRole command`)
      .addField(
        `Example`,
        `\`${p}AutoRole @Member\` Gives a new member the @Member role`
      )
      .addField(`Usage`, `\`${p}AutoRole [Addition Info] [Role]\``)
      .addField(`${p}AutoRole Info`, `Gives you the current autoroles set`)
      .addField(`${p}AutoRole Reset`, `Resets the list of roles`)
      .addField(`${p}AutoRole Help`, `Shows you this menu`)
      .addField(`${p}AutoRole Remove <Role>`, `Remove a role from the list`)
      .addField(`${p}AutoRole Add <Role>`, `Adds a role to the list`)
      .setColor('GREEN');

    message.channel.send(_);
  }
};
