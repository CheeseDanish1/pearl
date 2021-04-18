const {MessageEmbed, Message} = require('discord.js');
const {setLevelRole} = require('../../Storage/database');

/**
 *
 * @param {Message} message
 */

module.exports.run = (client, message, args, {GuildConfig}) => {
  const isAdmin = message.member.hasPermission('MANAGE_GUILD');
  switch (args && args.length && args[0].toLowerCase()) {
    case 'list':
      let lr =
        GuildConfig.levelRoles &&
        GuildConfig.levelRoles.length &&
        !GuildConfig.levelRoles.every(r => !r.roles.length)
          ? new MessageEmbed()
              .setTitle(`Info on Xp Autoroles`)
              .setAuthor(
                message.author.username,
                message.author.avatarURL({format: 'png', dynamic: true})
              )
              .setDescription(
                GuildConfig.levelRoles
                  .filter(r => r.roles.length)
                  .sort((a, b) => a.level - b.level)
                  .map(
                    r =>
                      `**Level**: ${r.level} - **Roles**: ${r.roles
                        .map(m => `<@&${m.id}>`)
                        .join(', ')}`
                  )
                  .join('\n')
              )
          : `There aren't any level roles set up in this server\nDo \`${GuildConfig.prefix}Help LevelRoles\` for more info`;
      message.channel.send(lr);
      break;

    case 'add':
      {
        if (!isAdmin) return 'You dont have permission to use this command';
        const number = args[1];
        if (!number)
          return message.channel.send(`You need to provide the level`);
        if (isNaN(number))
          return message.channel.send(
            'The level you provide needs to be a number'
          );
        let parsedNum = parseInt(number);
        if (parsedNum < 0)
          return message.channel.send('The level can not be less than 0');
        if (parsedNum > 100)
          return message.channel.send('The level can not be more than 100');
        let r = message.mentions.roles.array().length
          ? message.mentions.roles.array()
          : args
              .slice(2)
              .map(r => message.guild.roles.cache.get(r))
              .filter(r => r != null);
        if (!r.length)
          return message.channel.send(
            `You need to provide roles for me to give out`
          );
        let roles = r.map(({name, id}) => ({name, id}));
        let f = GuildConfig.levelRoles.find(r => r.level == parsedNum) || {
          roles: [],
        };
        let nowRoles = [...f.roles, roles].flat();
        let finalRoles = nowRoles.filter(({name, id}, i) => {
          return nowRoles.findIndex(r => r.name == name && r.id == id) == i;
        });
        const embed = new MessageEmbed()
          .setTitle(`New Roles For Level ${parsedNum}`)
          .setDescription(
            finalRoles.length
              ? finalRoles.map(r => `<@&${r.id}>`).join(', ')
              : 'None'
          )
          .setAuthor(
            message.author.username,
            message.author.avatarURL({dynamic: true})
          );
        message.channel.send(embed);
        setLevelRole(message.guild.id, parsedNum, finalRoles);
      }
      break;

    case 'resetall':
      if (!isAdmin) return 'You dont have permission to use this command';

      message.channel.send(`Reset level roles for this server`);
      setLevelRole(message.guild.id, 'reset');
      break;

    case 'remove':
      {
        if (!isAdmin) return 'You dont have permission to use this command';
        const number = args[1];
        if (!number)
          return message.channel.send(`You need to provide the level`);
        if (isNaN(number))
          return message.channel.send(
            'The level you provide needs to be a number'
          );
        let parsedNum = parseInt(number);
        if (parsedNum < 0)
          return message.channel.send('The level can not be less than 0');
        if (parsedNum > 100)
          return message.channel.send('The level can not be more than 100');
        // These are the current roles set
        const q = GuildConfig.levelRoles.find(r => r.level == parsedNum);
        if (!q)
          return message.channel.send('There are no roles with that level');
        let r = message.mentions.roles.array().length
          ? message.mentions.roles.array()
          : args
              .slice(2)
              .map(r => message.guild.roles.cache.get(r))
              .filter(r => r);
        if (!r.length)
          return message.channel.send(`What roles would you like me to remove`);
        // These are the roles provided to remove
        let roles = r.map(({name, id}) => ({name, id}));
        // These are the roles that are provided and are currently set
        const matchRoles = roles.filter(r =>
          q.roles.find(f => f.name == r.name && f.id == r.id)
        );
        if (!matchRoles || !matchRoles.length)
          return message.channel.send(
            `You did not provide any roles that are given at that level`
          );
        // These are the roles proved with the ones provided removed
        const newRoles = q.roles.filter(
          p => !matchRoles.find(f => f.name == p.name && f.id == p.id)
        );
        const embed = new MessageEmbed()
          .setTitle(`New Roles For Level ${parsedNum}`)
          .setDescription(
            newRoles.length
              ? newRoles.map(r => `<@&${r.id}>`).join(', ')
              : 'None'
          )
          .setAuthor(
            message.author.username,
            message.author.avatarURL({dynamic: true})
          );
        message.channel.send(embed);
        setLevelRole(message.guild.id, parsedNum, newRoles);
      }
      break;
    default:
      break;
  }
};

module.exports.info = {
  name: 'levelroles',
  alias: [],
  usage: '<p>LevelRoles (Add | Remove) [Level] [Roles]',
  example: '<p>LevelRoles List\n<p>LevelRoles Add  6 @Active',
  description: 'Set a role to be given out at a certain xp level',
  category: 'xp',
};
