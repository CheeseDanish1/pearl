/** @format */

const {MessageEmbed} = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {
  const {GuildConfig: Guild} = ops;

  if (!message.member.permissions.has('ADMINISTRATOR'))
    return message.channel.send(`You do not have permissions!`);
  if (!args[0])
    return message.channel.send(`You did not specify your channel id.`);
  if (!args[1]) return message.channel.send(`You did not specify you role id.`);
  if (!args[2])
    return message.channel.send(`You did not specify your reaction.`);

  function isCustomEmoji(emoji) {
    return !emoji.split(':').length == 1;
  }

  if (!message.guild.roles.cache.has(args[1]))
    return message.channel.send(`That role does not exist in this guild!`);
  if (isCustomEmoji(args[2]))
    return message.channel.send(`That is a custom emoji!`);
  let ch = message.guild.channels.cache.get(args[0]);
  if (!ch)
    return message.channel.send(`That channel does not exist in this guild!`);

  if (args[3]) {
    const messages = await ch.messages.fetch();
    const msg = messages.get(args[3]);
    if (!msg)
      return message.channel.send(
        'The message id provided is invalid. \nIf you think that this error is a mistake, join the Pearl official support server, and ask the support there for help'
      );

    await msg.react(args[2]);

    const newData = {
      Reaction: args[2],
      MessageId: msg.id,
      Role: args[1],
    };

    // newData.save()
    await Guild.update({
      $push: {
        reactionRoles: newData,
      },
    });

    message.channel.send('Success :smile:');
  } else {
    const embed = new MessageEmbed()
      .setTitle(`Reaction role menu`)
      .setTimestamp(Date.now())
      .setDescription(
        `Reactions:
                ${args[2]} - ${message.guild.roles.cache.get(args[1]).name}
                `.trim()
      )
      .setColor('RANDOM');

    const msg = await ch.send(embed);

    await msg.react(args[2]);

    const newData = {
      Reaction: args[2],
      MessageId: msg.id,
      Role: args[1],
    };

    await Guild.update({
      $push: {
        reactionRoles: newData,
      },
    });
  }
};
