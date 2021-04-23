const d = require('discord.js');
const {setWelcome} = require('../../Storage/database');

/**
 *
 * @param {d.Message} message
 */

module.exports.run = async (client, message, args, {GuildConfig}) => {
  console.log(GuildConfig.welcome);

  if (!args || !args.length || !args[0])
    return message.channel.send('You need to provide a message or a channel');

  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  const chan =
    message.guild.channels.cache.get(args[0]) ||
    message.mentions.channels.first()
      ? args[0] == message.mentions.channels.first().toString()
        ? message.mentions.channels.first()
        : false
      : false;

  if (!!chan) {
    const mes = await message.channel.send(
      `Are sure you want to change the welcome channel to **#${chan.name}**`
    );
    const check = '✅';
    const x = '❌';
    await mes.react(check);
    await mes.react(x);
    const collected = mes.createReactionCollector(
      (r, u) =>
        u.id == message.author.id && [check, x].some(f => f == r.emoji.name),
      {max: 1, time: 20000}
    );
    collected.on('collect', r => {
      if (r.emoji.name == check) {
        message.channel.send(`Set welcome channel to **#${chan.name}**`);
        setWelcome(
          {
            channel: chan.id,
            message: GuildConfig.welcome.message,
            dm: GuildConfig.welcome.dm,
          },
          message.guild.id
        );
      } else {
        message.channel.send('Canceling changes');
      }
    });
    collected.on('end', c =>
      c.size == 0 ? message.channel.send('You ran out of time') : ''
    );
  } else {
    const mess = args
      .join(' ')
      .replace(/{mention}/, '@User')
      .replace(/{username}/, 'Username')
      .replace(/{mc}/, 'MemberCount')
      .replace(/{server}/, 'Server')
      .replace(/{inviter}/, '@Inviter')
      .replace(/{invitername}/, 'Inviter')
      .replace(/{inviterName}/, 'Inviter')
      .replace(/{InviterName}/, 'Inviter')
      .replace(/{Invitername}/, 'Inviter');

    const mes = await message.channel.send(
      `Here is an example of the message you put in \`${mess}\`\nAre you sure you would like to change the message to that`
    );
    const check = '✅';
    const x = '❌';
    await mes.react('✅');
    await mes.react('❌');
    const collected = mes.createReactionCollector(
      (r, u) =>
        u.id == message.author.id && [check, x].some(f => f == r.emoji.name),
      {max: 1, time: 20000}
    );
    collected.on('collect', r => {
      if (r.emoji.name == check) {
        message.channel.send(`Set welcome message to **${args.join(' ')}**`);
        setWelcome(
          {
            message: args.join(' '),
            channel: GuildConfig.welcome.channel,
            dm: GuildConfig.welcome.dm,
          },
          message.guild.id
        );
      } else {
        message.channel.send('Canceling changes');
      }
    });
    collected.on('end', c =>
      c.size == 0 ? message.channel.send('Did not get a responce in time') : ''
    );
  }
};

module.exports.info = {
  name: 'welcome',
  alias: [''],
  usage: '<p>Welcome <Message | Channel>',
  example:
    '<p>Levelup Welcome to {server} {username}! Make sure to get roles in #roles and read all the rules \n<p>Welcome #welcome',
  description:
    'Send a message when someone joins the server\nOptions are `{mention}`, `{username}`, `{server}`, `{mc}`, `{inviter}`, `{inviterName}`',
  category: 'admin',
};
