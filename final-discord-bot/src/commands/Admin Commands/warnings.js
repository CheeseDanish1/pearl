const {getGuildMember} = require('../../Storage/database');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(`You dont have permission to use this command`);

  const member = message.mentions.members.first() || message.member;
  const GuildMemberConfig = await getGuildMember(member.id, member.guild.id);
  const amount = GuildMemberConfig.warnings.amount || 0;

  message.channel.send(
    `**${member.displayName}** has been warned **${amount}** times${
      amount > 0 ? '\nType `extra` to view the information about each warn' : ''
    }`
  );
  if (amount == 0) return;

  const collecter = message.channel.createMessageCollector(
    mes => message.author.id == mes.author.id,
    {
      time: 15000,
      max: 1,
    }
  );
  collecter.on('collect', m => {
    if (m.content.toLowerCase() == 'extra') {
      message.channel.send(
        GuildMemberConfig.warnings.info
          .map(
            i =>
              `Warning **${i.warning}**, Reason **${i.reason}**, Warned By: **${
                message.guild.members.cache.get(i.warnedBy)
                  ? message.guild.members.cache.get(i.warnedBy).displayName
                  : 'Error'
              }**`
          )
          .join('\n')
      );
    }
  });
};

module.exports.info = {
  name: 'warnings',
  alias: [],
  usage: '<p>Warnings [User]',
  example: '<p>Warnings @Jimmy#7932',
  description: "View all of a user's warnings and why they were warned",
  category: 'moderation',
};
