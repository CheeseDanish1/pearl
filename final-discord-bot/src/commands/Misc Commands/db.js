const {Client, Message} = require('discord.js');

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = async (
  client,
  message,
  args,
  {UserConfig, GuildConfig, GuildMemberConfig}
) => {
  const hasGuildPerms = message.member.hasPermission('MANAGE_GUILD');
  if (args[0]) {
    let what = args.join(' ').toLowerCase();

    switch (what) {
      case 'guild' || 'server':
        if (!hasGuildPerms)
          message.channel.send(
            `You dont have permission to view the server config`
          );
        else message.author.send(`\`\`\`json\n${GuildConfig}\n\`\`\``);
        break;
      case 'member':
        message.author.send(`\`\`\`json\n${GuildMemberConfig}\n\`\`\``);
        break;
      case 'user':
        message.author.send(`\`\`\`json\n${UserConfig}\n\`\`\``);
        break;
      default:
        break;
    }
    return;
  }

  let mes = `Type \`User\` to see your user information\nType \`Member\` to see your member information`;
  if (hasGuildPerms) mes += `\nType \`Guild\` to see the server information`;

  message.channel.send(mes);

  const collecter = message.channel.createMessageCollector(
    m => m.author.id == message.author.id,
    {max: 1}
  );
  collecter.on('collect', async m => {
    if (!hasGuildPerms && m.content.toLowerCase() == 'guild')
      return message.channel.send(
        'You dont have permission to manage the server'
      );

    switch (m.content.toLowerCase()) {
      case 'guild':
        message.author.send(`\`\`\`json\n${GuildConfig}\n\`\`\``);
        message.channel.send(`Sent you all the server info`);
        break;
      case 'member':
        message.author.send(`\`\`\`json\n${GuildMemberConfig}\n\`\`\``);
        message.channel.send(`Sent you all your member info`);
        break;
      case 'user':
        message.author.send(`\`\`\`json\n${UserConfig}\n\`\`\``);
        message.channel.send(`Sent you all your user info`);
        break;
      default:
        break;
    }
  });
};

module.exports.info = {
  name: 'db',
  alias: ['database', 'getinfo', 'getstoredinfo'],
  usage: '<p>Db [User | Member | Guild]',
  example: '<p>Db Guild',
  description:
    'Get **ALL** information stored on you or your server in pearls database',
  category: 'misc',
};
