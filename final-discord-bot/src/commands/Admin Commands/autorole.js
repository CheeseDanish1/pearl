/** @format */

const {MessageEmbed, Message, Client} = require('discord.js');
const GuildConfig = require('../../database/models/GuildConfig');

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */

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
        await Guild.updateOne({autorole: []});
        // db.delete(`autorole_${message.guild.id}`)
        message.channel.send('Reset the autorole for this server');
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

        const newGuild = await GuildConfig.findOneAndUpdate(
          {id: message.guild.id},
          {$pull: {autorole: role.id}},
          {new: true}
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

        // if (role2)
        //   role2.comparePositionTo(
        //     message.guild.roles.cache.find(
        //       r => r.name.toLowerCase() == client.user.username.toLowerCase()
        //     )
        //   );

        if (autorole.includes(role2.id))
          return message.channel.send(
            `That role is already in the autorole for this server`
          );

        const newGuild2 = await GuildConfig.findOneAndUpdate(
          {id: message.guild.id},
          {$push: {autorole: role2.id}},
          {new: true}
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

    // if (args[0].toLowerCase() == 'reset') {
    //   await Guild.updateOne('autorole', []);
    //   // db.delete(`autorole_${message.guild.id}`)
    //   return message.channel.send('Reset the autorole for this guild');
    // } else if (args[0].toLowerCase() == 'remove') {
    //   let role =
    //     message.mentions.roles.first() ||
    //     message.guild.roles.cache.get(args[1]);
    //   if (!role)
    //     return message.channel.send(
    //       'Please mention the role you want to remove'
    //     );

    //   if (!autorole.includes(role.id))
    //     return message.channel.send(
    //       'The auto role for the guild does not includes ' + role.name
    //     );

    //   // if (!db.fetch(`autorole_${message.guild.id}`).includes(`/${role.id}/`)) return message.channel.send("The auto role for the guild does not includes " + role.name)

    //   // let oldRoles = db.fetch(`autorole_${message.guild.id}`)
    //   // let newRoles = oldRoles.filter(r => r != `/${role.id}/`);
    //   // db.set(`autorole_${message.guild.id}`, newRoles)

    //   const newGuild = await GuildConfig.findOneAndUpdate(
    //     {id: message.guild.id},
    //     {$pull: {autorole: role.id}},
    //     {new: true}
    //   );

    //   if (!newGuild.autorole.length)
    //     return message.channel.send(
    //       `Removed role ${role.name}\nThe auto role for this server is now **None**`
    //     );

    //   return message.channel.send(
    //     `Remove role ${
    //       role.name
    //     }\nNow the auto role for this server is ${newGuild.autorole
    //       .map(r => message.guild.role.cache.get(r))
    //       .join(', ')}`
    //   );

    //   // let re =

    //   // if (!re) return message.channel.send(`Removed role ${role.name}\nThe auto role for this server is now **None**`)

    //   // re.forEach(r => {
    //   //     idk.push("**" + message.guild.roles.cache.get(r.split("/")[1]).name + "**")
    //   // })

    //   // return message.channel.send(`Removed role ${role.name}\nThe auto role for this guild is now ${idk.join(", ")}`)
    // } else if (args[0].toLowerCase() == 'add') {
    //   let role = message.mentions.roles.first();
    //   if (!role) return message.channel.send('What you provided is not a role');

    //   if (db.fetch(`autorole_${message.guild.id}`)) {
    //     if (db.fetch(`autorole_${message.guild.id}`).includes(`/${role.id}/`))
    //       return message.channel.send(
    //         'You already have that set as the autorole'
    //       );
    //   }

    //   db.push(`autorole_${message.guild.id}`, '/' + role.id + '/');

    //   let idk = [];

    //   db.fetch(`autorole_${message.guild.id}`).forEach(r => {
    //     idk.push(
    //       '**' + message.guild.roles.cache.get(r.split('/')[1]).name + '**'
    //     );
    //   });

    //   message.channel.send(
    //     `The auto role(s) for this guild are ${idk.join(', ')}`
    //   );
    // } else if (args[0].toLowerCase() == 'info') {
    //   let idk = [];

    //   let re = db.fetch(`autorole_${message.guild.id}`);

    //   if (!re)
    //     return message.channel.send('There is no autorole for this guild');

    //   re.forEach(r => {
    //     idk.push(
    //       '**' + message.guild.roles.cache.get(r.split('/')[1]).name + '**'
    //     );
    //   });

    //   return message.channel.send(
    //     `The auto role(s) for this guild are ${idk.join(', ')}`
    //   );
    // } else if (args[0].toLowerCase() == 'help') {
    //   let p = prefix;
    //   const _ = new MessageEmbed()
    //     .setTitle(`${p}AutoRole command`)
    //     .addField(
    //       `Example`,
    //       `\`${p}AutoRole @Member\` Gives a new member the @Member role`
    //     )
    //     .addField(`Usage`, `\`${p}AutoRole [Addition Info] [Role]\``)
    //     .addField(`${p}AutoRole Info`, `Gives you the current autoroles set`)
    //     .addField(`${p}AutoRole Reset`, `Resets the list of roles`)
    //     .addField(`${p}AutoRole Help`, `Shows you this menu`)
    //     .addField(`${p}AutoRole Remove <Role>`, `Remove a role from the list`)
    //     .addField(`${p}AutoRole Add <Role>`, `Adds a role to the list`)
    //     .setColor('GREEN');

    //   message.channel.send(_);
    // } else {
    //   let role =
    //     message.mentions.roles.first() ||
    //     message.guild.roles.cache.get(args[0]);
    //   if (!role) return message.channel.send('What you provided is not a role');

    //   if (db.fetch(`autorole_${message.guild.id}`)) {
    //     if (db.fetch(`autorole_${message.guild.id}`).includes(`/${role.id}/`))
    //       return message.channel.send(
    //         'You already have that set as the autorole'
    //       );
    //   }

    //   db.push(`autorole_${message.guild.id}`, '/' + role.id + '/');

    //   let idk = [];

    //   db.fetch(`autorole_${message.guild.id}`).forEach(r => {
    //     idk.push(
    //       '**' + message.guild.roles.cache.get(r.split('/')[1]).name + '**'
    //     );
    //   });

    //   message.channel.send(
    //     `The auto role(s) for this guild are ${idk.join(', ')}`
    //   );
    // }
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
