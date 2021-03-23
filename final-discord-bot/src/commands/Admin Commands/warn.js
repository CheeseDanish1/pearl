const {addWarning, getGuildMember} = require('../../Storage/database');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      `You need the \`MANAGE_GUILD\` permissions to use this command`
    );

  const member = message.mentions.members.first();

  if (!member)
    return message.channel.send(
      'Please mention the person to who you want to warn - warn @mention <reason>'
    );

  if (member.user.bot) return message.channel.send('You can not warn bots');

  if (message.author.id === member.id)
    return message.channel.send('You can not warn yourself');

  if (member.id === message.guild.owner.id)
    return message.channel.send('You jerk, how can you warn server owner -_-');

  const GuildMemberConfig = await getGuildMember(member.id, member.guild.id);

  const reason = args.slice(1).join(' ') || 'No reason';

  const warns = GuildMemberConfig.warnings || [];
  const amount = warns.amount || 0;

  let info = {
    warning: amount + 1,
    warnedBy: message.author.id,
    reason,
  };
  member.send(
    `You have been warned in **${message.guild.name}** for **${reason}**`
  );
  message.channel.send(
    `You warned **${
      member.user.username
    }** for **${reason}**, they now have **${amount + 1}** warning`
  );
  return addWarning(info, member.user.username, message.guild.id);
};

module.exports.info = {
  name: 'warn',
  alias: [],
  usage: '<p>Warn [User] (Reason)',
  example: '<p>Warn @Jimmy#7932 Spamming',
  description: 'Warn someone for breaking the server rules',
  category: 'moderation',
};
