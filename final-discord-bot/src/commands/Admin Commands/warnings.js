const GuildMemberConfig = require('../../database/models/GuildMemberConfig');
const {Message} = require('discord.js');

/**
 *
 * @param {Message} message
 */

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(`You dont have permission to use this command`);

  const member = message.mentions.members.first() || message.member;

  const GuildMember =
    (await GuildMemberConfig.findOne({
      id: member.id,
      guild: message.guild.id,
    })) ||
    (await GuildMemberConfig.create({id: member.id, guild: message.guild.id}));

  const amount = GuildMember.warnings.amount || 0;

  message.channel.send(
    `${member.displayName} has been warned **${amount}** times${
      amount > 0 ? '\nType `extra` to view the information about each warn' : ''
    }`
  );
  if (amount == 0) return;

  const collecter = message.channel.createMessageCollector(
    mes => message.author.id == mes.author.id,
    {
      time: 15000,
      max: 1
    }
  );
  collecter.on('collect', m => {
    if (m.content.toLowerCase() == 'extra') {
      message.channel.send(
        GuildMember.warnings.info
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

  // const user = message.mentions.members.first() || message.author

  // const Guild = await GuildConfig.findOne({id: message.guild.id})
  // console.log(Guild)
  // const warnings = Guild.warnings.find(w => w.who == user.id)
  // let amount

  // if (!warnings) amount = 0;
  // else amount = warnings.amount

  // message.channel.send(`${user} has **${amount}** warning(s)`);
};
