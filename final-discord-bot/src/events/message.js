/** @format */

const {onMes} = require('../Storage/functions');
const {Client, Message} = require('discord.js');
const {getUser, getGuild, getGuildMember} = require('../Storage/database');

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message) => {
  //Leave's if you are in a DM Or if the bot sends a message or if they have admin only mode set to true
  if (message.guild === null || message.author.bot) return;

  let Guild = await getGuild(message.guild.id);

  let GuildMember = await getGuildMember(message.member.id, message.guild.id);

  let User = await getUser(message.author);

  if (!Guild || !User || !GuildMember)
    return message.channel.send('Unknown error');

  //Get's the prefix the user set.
  let prefix = Guild.prefix || '>';

  if (message.content.toLowerCase() == 'prefix')
    message.channel.send(`${message.guild.name}s prefix is **${prefix}**`);

  const iChan = Guild.ignoredStuff.channels;
  const iMem = Guild.ignoredStuff.people;
  const iRole = Guild.ignoredStuff.roles;

  if (iChan.length > 0) {
    if (iChan.includes(message.channel.id)) {
      if (message.content.startsWith(prefix))
        return message.channel.send("You can't use commands in this channel");
      return;
    }
  }

  if (iMem.length > 0) {
    if (iMem.includes(message.author.id)) {
      if (message.content.startsWith(prefix))
        return message.channel.send(
          'I am set to ignore you, if you think this is a mistake, please contact the server owner'
        );
      return;
    }
  }

  if (iRole.length > 0) {
    if (
      hasCommonElements(
        iRole,
        message.member.roles.cache.array().map(g => g.id)
      )
    ) {
      if (message.content.startsWith(prefix))
        return message.channel.send('Ignored');
      return;
    }
  }

  function hasCommonElements(arr1, arr2) {
    return arr1.some(item => arr2.includes(item));
  }

  //Removes any swear words
  if (Guild.ops.profanities) {
    const sreg = require('../Storage/curseRegex');
    if (message.content.match(sreg)) {
      message.delete();
      message.reply('No swearing');
      return;
    }
  }

  //Detect Zalgo
  if (Guild.ops.zalgo) {
    const re = /%CC%/g;
    const hasZalgo = txt => re.test(encodeURIComponent(txt));

    if (hasZalgo(message.content)) {
      message.delete();
      return message.channel.send('No zalgo');
    }
  }

  const bw = Guild.ops.bannedWords;

  if (bw.length) {
    if (
      message.content.toLowerCase().includes(bw) &&
      !message.content.toLowerCase().startsWith(`${prefix}banword`) &&
      message.member.hasPermission('MANAGE_GUILD')
    ) {
      message.delete();
      return message.channel
        .send('Your message includes banned words')
        .then(mes => mes.delete({timeout: '3000'}));
    }
  }

  await onMes(GuildMember);

  const c = Guild.customCommands.find(
    c => c.command == message.content.toLowerCase()
  );
  if (c) return message.channel.send(c.content);

  //Return's if the message does not start with the set prefix
  if (
    !message.content.startsWith(prefix) ||
    message.content.startsWith(prefix + ' ')
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  const alias = [...client.commands.entries()].find(f => {
    if (!f[1].info || !f[1].info.alias) return;
    return f[1].info.alias.includes(command);
  });

  let adminOnly = Guild.ops.adminOnly;
  if (adminOnly && !message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send('Admin only mode is on');

  const ops = {
    GuildConfig: Guild,
    GuildMemberConfig: GuildMember,
    UserConfig: User,
    prefix,
  };

  if (cmd) {
    cmd.run(client, message, args, ops);
    await User.updateOne({
      $set: {lastCmdRanDate: Date.now(), lastCmdRanName: command},
    });
    return;
  } else if (alias) {
    alias[1].run(client, message, args, ops);
    return await User.updateOne({
      $set: {lastCmdRanDate: Date.now(), lastCmdRanName: command},
    });
  }

  return message.channel.send(`Command doesn't exist`);
};
