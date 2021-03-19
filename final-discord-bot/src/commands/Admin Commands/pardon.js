const {removeWarnings, getGuildMember} = require('../../Storage/database');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      `You need the \`MANAGE_GUILD\` permissions to use this command`
    );

  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  let amount = args[1];

  if (!amount)
    return message.channel.send(
      'You need to provide how many warnings you want to remove'
    );
  if (amount.toLowerCase() != 'all' && isNaN(parseInt(amount)))
    return message.channel.send(
      'The amount of warnings you want to remove must be a number'
    );

  if (!member)
    return message.channel.send("Who's warnings do you want to pardon?");

  if (member.user.bot) return message.channel.send('Bots dont have warnings');

  const gme = await getGuildMember(member.id, member.guild.id);
  if (gme.warnings.amount - amount < 0) amount = 'all';
  // message.channel.send(`Reset ${member.displayName} warnings`);
  message.channel.send(
    `Removed **${amount}** of **${member.user.username}** warnings`
  );
  await removeWarnings(amount, gme, member.id, member.guild.id);
};

module.exports.info = {
  name: 'pardon',
  alias: ['resetwarnings', 'padon'],
  usage: '<p>Pardon [Member] [Amount]',
  example: '<p>Pardon @Jimmy#7932 2',
  description: 'Remove a server members warnings',
  category: 'moderation',
};
