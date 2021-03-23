const {enableCommand} = require('../../Storage/database');

module.exports.run = (client, message, args, {GuildConfig, prefix}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(`You dont have permission to use this command`);

  if (!args[0])
    return message.channel.send(
      'You need to provide the command you want to enable'
    );

  const disabledCommands = GuildConfig.disabledCommands;

  let command =
    client.commands.get(args[0].toLowerCase()) ||
    [...client.commands.entries()].find(f => {
      if (!f[1].info || !f[1].info.alias) return;
      return f[1].info.alias.includes(args[0].toLowerCase());
    })[1];

  // return;
  if (!command) return message.channel.send(`I could not find that command`);
  let cmd = args[0][0].toUpperCase() + args[0].substring(1).toLowerCase();
  if (!disabledCommands.includes(command.info.name))
    return message.channel.send(
      `That command is not disabled! Did you mean \`${prefix}DisableCommand ${cmd}\``
    );

  message.channel.send(`Enabled command \`${cmd}\``);
  enableCommand(command, message.guild.id);
};

module.exports.info = {
  name: 'enablecommand',
  alias: [],
  usage: '<p>EnableCommand [Command]',
  example: '<p>EnableCommand Say\n<p>EnableCommand Snipe',
  description: 'Enable usage of a previously disabled command in the server',
  category: 'admin',
};
