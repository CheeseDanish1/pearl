/** @format */

const {MessageEmbed, Message, Guild} = require('discord.js');

/**
 *
 * @param {Message} message
 */

module.exports.run = async (client, message, args, {GuildConfig}) => {
  if (!message.member.permissions.has('ADMINISTRATOR'))
    return message.channel.send(`You do not have permissions!`);

  message.channel.send(
    'Please mention the channel you want the reaction role to be in'
  );

  let step = 1;
  const data = {
    Reaction: null,
    MessageId: null,
    Role: null,
    Channel: null,
  };
  const collector = message.channel.createMessageCollector(
    m => m.author.id == message.author.id
  );
  collector.on('collect', m => {
    if (['exit', 'stop'].some(k => k == m.content.toLowerCase()))
      return collector.stop();

    if (step == 1) {
      let chan =
        m.mentions.channels.first() ||
        m.guild.channels.cache.get(m.content) ||
        m.guild.channels.cache.find(
          c => c.name.toLowerCase() == m.content.toLowerCase()
        );
      if (!chan)
        return m.channel.send(
          'The channel you provided was invalid, try again'
        );
      data.Channel = chan.id;
      step++;
      return m.channel.send(`Mention the role you would like to give out`);
    } else if (step == 2) {
      let role =
        m.mentions.roles.first() ||
        m.guild.roles.cache.get(m.content) ||
        m.guild.rloes.cache.find(
          c => c.name.toLowerCase() == m.content.toLowerCase()
        );
      if (!role)
        return m.channel.send(
          'The role you provided was invalid, please try again'
        );
      data.Role = role.id;
      step++;
      return m.channel.send('Send the reaction emoji');
    } else if (step == 3) {
      let emoji = m.content;
      const isCustomEmoji = !emoji.split(':').length == 1;
      if (isCustomEmoji) return m.channel.send(`You cant use custom emojis`);
      m.react(emoji)
        .then(r => {
          data.Reaction = emoji;
          step++;
          m.reactions.removeAll();
          return m.channel.send('Provide the message id');
        })
        .catch(e =>
          m.channel.send(`You provided an invalid emoji. Please try again`)
        );
    } else if (step == 4) {
      const mes = m.content;
      if (isNaN(mes)) return m.channel.send(`Invalid id provided. Try again`);
      m.guild.channels.cache
        .get(data.Channel)
        .messages.fetch(mes, true)
        .then(async mess => {
          console.log(mess);
          if (!mess)
            return m.channel.send(
              `Could not find that message. Please try again`
            );
          step++;
          data.MessageId = mess.id;
          console.log(data);
          message.channel.send(`Reaction role created`);
          mess.react(data.Reaction);
          await GuildConfig.updateOne({$push: {reactionRoles: data}});
        })
        .catch(e => {
          m.channel.send(`Could not find that message`);
          console.log(e);
        });
    }
  });

  // if (!message.member.permissions.has('ADMINISTRATOR'))
  //   return message.channel.send(`You do not have permissions!`);
  // if (!args[0])
  //   return message.channel.send(`You did not specify your channel id.`);
  // if (!args[1]) return message.channel.send(`You did not specify you role id.`);
  // if (!args[2])
  //   return message.channel.send(`You did not specify your reaction.`);

  // function isCustomEmoji(emoji) {
  //   return !emoji.split(':').length == 1;
  // }

  // if (!message.guild.roles.cache.has(args[1]))
  //   return message.channel.send(`That role does not exist in this guild!`);
  // if (isCustomEmoji(args[2]))
  //   return message.channel.send(`That is a custom emoji!`);
  // let ch = message.guild.channels.cache.get(args[0]);
  // if (!ch)
  //   return message.channel.send(`That channel does not exist in this guild!`);

  // if (args[3]) {
  //   const messages = await ch.messages.fetch();
  //   const msg = messages.get(args[3]);
  //   if (!msg)
  //     return message.channel.send(
  //       'The message id provided is invalid. \nIf you think that this error is a mistake, join the Pearl official support server, and ask the support there for help'
  //     );

  //   await msg.react(args[2]);

  //   const newData = {
  //     Reaction: args[2],
  //     MessageId: msg.id,
  //     Role: args[1],
  //   };

  //   // newData.save()
  //   await Guild.update({
  //     $push: {
  //       reactionRoles: newData,
  //     },
  //   });

  //   message.channel.send('Success :smile:');
  // } else {
  //   const embed = new MessageEmbed()
  //     .setTitle(`Reaction role menu`)
  //     .setTimestamp(Date.now())
  //     .setDescription(
  //       `Reactions:
  //               ${args[2]} - ${message.guild.roles.cache.get(args[1]).name}
  //               `.trim()
  //     )
  //     .setColor('RANDOM');

  //   const msg = await ch.send(embed);

  //   await msg.react(args[2]);

  //   const newData = {
  //     Reaction: args[2],
  //     MessageId: msg.id,
  //     Role: args[1],
  //   };

  //   await Guild.update({
  //     $push: {
  //       reactionRoles: newData,
  //     },
  //   });
  // }
};

module.exports.info = {
  name: 'reactionrole',
  alias: ['rr', 'rradd'],
  usage: '<p>ReactionRole',
  example: '<p>ReactionRole',
  description: 'Interactive reaction role creation',
  category: 'admin',
};
