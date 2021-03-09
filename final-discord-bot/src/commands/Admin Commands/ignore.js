/** @format */

const Discord = require('discord.js');

module.exports.run = async (client, message, args, {GuildConfig}) => {
  const {
    channels: ignoredChannels,
    people: ignoredPeople,
    roles: ignoredRoles,
  } = GuildConfig.ignoredStuff;

  let memMen = message.mentions.members.first();

  args[0] && !memMen
    ? (memMen = message.guild.members.cache.get(args[0]))
    : memMen;

  let chanMen = message.mentions.channels.first();
  let roleMen = message.mentions.roles.first();

  if (args[0]) {
    if (args[0].toLowerCase() == 'channel' || args[0].toLowerCase() == 'chan') {
      if (!chanMen)
        return message.channel.send(
          'Please mention the channel you want to ignore'
        );

      if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send(
          'You do not have permission to use this command'
        );
      if (!message.guild.me.hasPermission('MANAGE_GUILD'))
        return message.channel.send(
          'I do not have permission to use this command'
        );

      if (ignoredChannels.includes(chanMen.id))
        return message.channel.send(`That channel is already being ignored`);

      await GuildConfig.updateOne({
        $push: {'ignoredStuff.channels': chanMen.id},
      });
      ignoredChannels.push(chanMen.id);

      // db.push(`ignoreChan_${message.guild.id}`, `/${chanMen.id}/`);
      return message.channel.send(
        `Now ignoring channel ${chanMen.toString()}.\nThe full list of ignored channels is ${ignoredChannels
          .map(
            m =>
              `**${
                message.guild.channels.cache.get(m)
                  ? message.guild.channels.cache.get(m).toString()
                  : 'Error'
              }**`
          )
          .join(', ')}`
      );
    } else if (
      args[0].toLowerCase() == 'member' ||
      args[0].toLowerCase() == 'person'
    ) {
      if (!memMen)
        return message.channel.send(
          'Please mention the member you want to ignore'
        );

      if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send(
          'You do not have permission to use this command'
        );
      if (!message.guild.me.hasPermission('MANAGE_GUILD'))
        return message.channel.send(
          'I do not have permission to use this command'
        );
      if (message.author.id == memMen.user.id)
        return message.channel.send("You can't ignore your self");
      if (memMen.hasPermission('ADMINISTRATOR'))
        return message.channel.send('You cant make me ignore an admin');

      if (!memMen)
        return message.channel.send(
          'Please provide a person you would like me to ignore'
        );

      if (ignoredChannels.includes(memMen.id)) {
        return message.channel.send(
          `Member ${memMen.user.username} is already being ignored`
        );
      }

      // db.push(`ignoreMem_${message.guild.id}`, `/${memMen.id}/`);
      await GuildConfig.updateOne({$push: {'ignoredStuff.people': memMen.id}});
      ignoredPeople.push(memMen.id);

      return message.channel.send(
        `Now ignoring member ${memMen.toString()}.\nThe full list of ignored members is ${ignoredPeople
          .map(
            m =>
              `**${
                message.guild.members.cache.get(m)
                  ? message.guild.members.cache.get(m).toString()
                  : 'Error'
              }**`
          )
          .join(', ')}`
      );
    } else if (args[0].toLowerCase() == 'role') {
      if (!roleMen)
        return message.channel.send(
          'Please mention the role you want to ignore'
        );

      if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send(
          'You do not have permission to use this command'
        );
      if (!message.guild.me.hasPermission('MANAGE_GUILD'))
        return message.channel.send(
          'I do not have permission to use this command'
        );

      if (!roleMen)
        return message.channel.send(
          'Please provide a role you would like me to ignore'
        );

      if (ignoredRoles.includes(roleMen.id)) {
        return message.channel.send(
          `Role ${roleMen.name} is already being ignored`
        );
      }

      // db.push(`ignoreRole_${message.guild.id}`, `/${roleMen.id}/`);
      await GuildConfig.updateOne({$push: {'ignoredStuff.roles': roleMen.id}});
      ignoredRoles.push(roleMen.id);

      return message.channel.send(
        `Now ignoring role ${roleMen.toString()}.\nThe full list of ignored roles is ${ignoredRoles
          .map(
            m =>
              `**${
                message.guild.roles.cache.get(m)
                  ? message.guild.roles.cache.get(m).toString()
                  : 'Error'
              }**`
          )
          .join(', ')}`
      );
    } else if (args[0].toLowerCase() == 'reset') {
      if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send(
          'You do not have permission to use this command'
        );
      if (!message.guild.me.hasPermission('MANAGE_GUILD'))
        return message.channel.send(
          'I do not have permission to use this command'
        );

      if (args[1]) {
        if (
          args[1].toLowerCase() == 'channels' ||
          args[1].toLowerCase() == 'chan'
        ) {
          await GuildConfig.updateOne({$set: {'ignoredStuff.channels': []}});
          return message.channel.send('Reset ignored channels for this guild');
        } else if (args[1].toLowerCase() == 'roles') {
          // db.delete(`ignoreRole_${message.guild.id}`);
          await GuildConfig.updateOne({$set: {'ignoredStuff.roles': []}});
          return message.channel.send('Reset ignored roles for this guild');
        } else if (args[1].toLowerCase() == 'members') {
          // db.delete(`ignoreMem_${message.guild.id}`);
          await GuildConfig.updateOne({$set: {'ignoredStuff.people': []}});
          return message.channel.send('Reset ignored members for this guild');
        } else if (args[1].toLowerCase() == 'all') {
          await GuildConfig.updateOne({
            $set: {ignoredStuff: {channels: [], people: [], roles: []}},
          });
          return message.channel.send(
            `Reset all ignored roles, members and channels for the guild`
          );
        } else {
          return message.channel.send(
            'Please provide a valid parameter to delete\nValid options are `Channels/Chan`, `Roles`, `Members`, or `All`'
          );
        }
      } else {
        return message.channel.send(
          'Please provide a parameter to delete\nValid options are `Channels/Chan`, `Roles`, `Members`, or `All`'
        );
      }
    } else if (args[0].toLowerCase() == 'list') {
      if (args[1]) {
        if (
          args[1].toLowerCase() == 'channels' ||
          args[1].toLowerCase() == 'chan'
        ) {
          if (ignoredChannels.length <= 0)
            return message.channel.send(
              'There are no channels being ignored in this server'
            );

          return message.channel.send(
            `The full list of ignored channels for this server is ${ignoredChannels
              .map(
                m =>
                  `**${
                    message.guild.channels.cache.get(m)
                      ? message.guild.channels.cache.get(m).toString()
                      : 'Error'
                  }**`
              )
              .join(', ')}`
          );
        } else if (args[1].toLowerCase() == 'roles') {
          if (ignoredRoles.length <= 0)
            return message.channel.send(
              'There are no roles being ignored in this server'
            );

          return message.channel.send(
            `The full list of ignored roles for this server is ${ignoredRoles
              .map(
                m =>
                  `**${
                    message.guild.roles.cache.get(m)
                      ? message.guild.roles.cache.get(m).toString()
                      : 'Error'
                  }**`
              )
              .join(', ')}`
          );
        } else if (args[1].toLowerCase() == 'members') {
          if (ignoredPeople.length <= 0)
            return message.channel.send(
              'There are no members being ignored in this server'
            );

          return message.channel.send(
            `The full list of ignored members for this server is ${ignoredPeople
              .map(
                m =>
                  `**${
                    message.guild.members.cache.get(m)
                      ? message.guild.members.cache
                          .get(m)
                          .toString()
                      : 'Error'
                  }**`
              )
              .join(', ')}`
          );
        } else if (args[1].toLowerCase() == 'all') {
          const _ = new Discord.MessageEmbed()
            .setTitle('Everything Being Ignored')
            .addField(
              'Ignored Channels',
              ignoredChannels.length > 0
                ? ignoredChannels
                    .map(
                      m =>
                        `**${
                          message.guild.channels.cache.get(m)
                            ? message.guild.channels.cache
                                .get(m)
                                .toString()
                            : 'Error'
                        }**`
                    )
                    .join(', ')
                : 'No channels Being Ignored'
            )
            .addField(
              'Ignored Roles',
              ignoredRoles.length > 0
                ? ignoredRoles
                    .map(
                      m =>
                        `**${
                          message.guild.roles.cache.get(m)
                            ? message.guild.roles.cache
                                .get(m)
                                .toString()
                            : 'Error'
                        }**`
                    )
                    .join(', ')
                : 'No Roles Being Ignored'
            )
            .addField(
              'Ignored Members',
              ignoredPeople.length > 0
                ? ignoredPeople
                    .map(
                      m =>
                        `**${
                          message.guild.members.cache.get(m)
                            ? message.guild.members.cache
                                .get(m)
                                .toString()
                            : 'Error'
                        }**`
                    )
                    .join(', ')
                : 'No Members Being Ignored'
            )
            .setColor('RANDOM');

          message.channel.send(_);
        } else {
          return message.channel.send(
            'Please provide a valid parameter to list\nValid options are `Channels/Chan`, `Roles`, `Members`, or `All`'
          );
        }
      } else
        return message.channel.send(
          'Please provide a parameter to list\nValid options are `Channels/Chan`, `Roles`, `Members`, or `All`'
        );
    } else if (args[0].toLowerCase() == 'remove') {
      if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send(
          'You do not have permission to use this command'
        );
      if (!message.guild.me.hasPermission('MANAGE_GUILD'))
        return message.channel.send(
          'I do not have permission to use this command'
        );

      if (args[1]) {
        if (
          args[1].toLowerCase() == 'channel' ||
          args[1].toLowerCase() == 'chan'
        ) {
          if (!args[2])
            return message.channel.send(
              'Pease provide a channel you want to remove from ignored channels\nTo see a list of ignored channels do `>Ignore List Channels`'
            );
          if (!chanMen)
            return message.channel.send(
              'Please mention the channel you would like to remove from the ignored channels list\nTo see a list of ignored channels do `>Ignore List Channels`'
            );

          if (!ignoredChannels.includes(chanMen.id))
            return message.channel.send(
              'The channel you provided is not in the list of ignored channels\nTo see a list of ignored channels, do `>Ignore List Channels`'
              )

          await GuildConfig.updateOne({$pull: {"ignoredStuff.channels": chanMen.id}})

          return message.channel.send(
            `Successfully removed ${chanMen.toString()} from list of ignored channels`
          );
        } else if (args[1].toLowerCase() == 'role') {
          if (!args[2])
            return message.channel.send(
              'Pease provide a role you want to remove from ignored roles\nTo see a list of ignored roles do `>Ignore List Roles`'
            );
          if (!roleMen)
            return message.channel.send(
              'Please mention a role you would like to remove from the ignored roles list\nTo see a list of ignored roles, do `>Ignore List Roles`'
            );

          if (!ignoredRoles.includes(roleMen.id))
            return message.channel.send(
              'The role you provided is not in the list of ignored roles\nTo see a list of ignored roles, do `>Ignore List Roles`'
            );

          // let oldArr = db.fetch(`ignoreRole_${message.guild.id}`);
          // let newArr = oldArr.filter(r => r != `/${roleMen.id}/`);

          // db.set(`ignoreRole_${message.guild.id}`, newArr);
          // if (db.get(`ignoreRole_${message.guild.id}`).length == 0)
          //   db.set(`ignoreRole_${message.guild.id}`, null);

          await GuildConfig.updateOne({"$pull": {"ignoredStuff.roles": roleMen.id}})

          return message.channel.send(
            `Successfully removed ${roleMen.toString()} from list of ignored roles`
          );
        } else if (args[1].toLowerCase() == 'member') {
          if (!args[2])
            return message.channel.send(
              'Pease provide a member you want to remove from ignored member\nTo see a list of ignored members do `>Ignore List Members`'
            );
          if (!memMen)
            return message.channel.send(
              'Please mention a member you would like to remove from the ignored members list\nTo see a list of ignored members, do `>Ignore List Members`'
            );

          if (!ignoredPeople.includes(memMen.id))
            return message.channel.send(
              'The member you provided is not in the list of ignored member\nTo see a list of ignored member, do `>Ignore List Members`'
            );
          
          await GuildConfig.updateOne({$pull: {"ignoredStuff.people": memMen.id}})
          // let oldArr = db.fetch(`ignoreMem_${message.guild.id}`);
          // let newArr = oldArr.filter(r => r != `/${memMen.id}/`);

          // db.set(`ignoreMem_${message.guild.id}`, newArr);
          // if (db.get(`ignoreMem_${message.guild.id}`).length == 0)
          //   db.set(`ignoreMem_${message.guild.id}`, null);

          return message.channel.send(
            `Successfully removed ${memMen.toString()} from list of ignored members`
          );
        }else {
          return message.channel.send(
            'Please provide a valid parameters to remove\nValid options are `Channel/Chan`, `Role`, or `Member`'
          );
        }
      } else
        return message.channel.send(
          'Please provide a parameters to delete\nValid options are `Channel/Chan`, `Role`, or `Member`'
        );
    }
  } else {
    return message.channel.send(`
\`\`\`
Ignore Channel - Ignores messages sent in the given channel - Usage >Ignore Channel <Channel> - Example > Ignore Channel #Spam

Ignore Member - Ignores messages from the person given - Usage >Ignore Member <Member> - Example >Ignore Member @Friend#1234

Ignore Role - Ignores message from anyone with the role given - Usage >Ignore Role <Role> - Example >Ignore Role @Example

Ignore List Channels - Lists All The Ignored Channels

Ignore List Members - Lists All The Ignored Members

Ignore List Roles - Lists All The Ignored Roles

Ignore List All - Lists Everything Ignored

Ignore Remove Channel - Removes A Channel That Is Being Ignored From The Ignored Chanels List - Usage >Ignore Remove Channel <Channel>

Ignore Remove Member - Removes A Member That Is Being Ignored From The Ignored Member List - Usage >Ignore Remove Member <Member>

Ignore Remove Role - Removes A Role That Is Being Ignored From The Ignored Roles List - Usage >Ignore Remove Role <Role>
\`\`\`
        `);
  }
};
