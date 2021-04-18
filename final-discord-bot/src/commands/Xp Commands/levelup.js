const d = require('discord.js');
const {setLevelup} = require('../../Storage/database');

/**
 *
 * @param {d.Message} message
 */

module.exports.run = async (client, message, args) => {
  if (!args || !args.length || !args[0])
    return message.channel.send('You need to provide a message or a channel');

  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  const chan =
    message.guild.channels.cache.get(args[0]) ||
    message.mentions.channels.first();

  if (!!chan) {
    const mes = await message.channel.send(
      `Are sure you want to change the level up channel to **#${chan.name}**`
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
        message.channel.send(`Set level up channel to **#${chan.name}**`);
        setLevelup({channel: chan.id}, message.guild.id);
      } else {
        message.channel.send('Canceling changes');
      }
    });
    collected.on('end', c =>
      c.size == 0 ? message.channel.send('Canceling changes') : ''
    );
  } else {
    const mess = args
      .join(' ')
      .replace(/{mention}/, '@User')
      .replace(/{level}/, 6)
      .replace(/{username}/, 'Username');
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
        message.channel.send(`Set level up message to **${args.join(' ')}**`);
        setLevelup({message: args.join(' ')}, message.guild.id);
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
  name: 'levelup',
  alias: ['lv', 'lvup'],
  usage: '<p>Levelup <Message | Channel>',
  example:
    '<p>Levelup Congrats {mention} on getting to level {level}\n<p>Levelup #levelup',
  description:
    'Send a message when someone levels up\nOptions are `{mention}`, `{name}` and `{level}`, ',
  category: 'xp',
};
