const {disableCommand} = require('../../Storage/database');

module.exports.run = (client, message, args, {GuildConfig, prefix}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(`You dont have permission to use this command`);

  if (!args[0])
    return message.channel.send(
      'You need to provide the command you want to disable'
    );

  const disabledCommands = GuildConfig.disabledCommands;

  if (args[0].toLowerCase() === 'list')
    return message.channel.send(
      `Disabled commands for this server are ${
        disabledCommands.length
          ? disabledCommands
              .map(
                d => `\`${d[0].toUpperCase() + d.substring(1).toLowerCase()}\``
              )
              .join(', ')
          : '`None`'
      }`
    );

  let command =
    client.commands.get(args[0].toLowerCase()) ||
    [...client.commands.entries()].find(f => {
      if (!f[1].info || !f[1].info.alias) return;
      return f[1].info.alias.includes(args[0].toLowerCase());
    })[1];

  // return;
  if (!command) return message.channel.send(`I could not find that command`);
  let cmd = args[0][0].toUpperCase() + args[0].substring(1).toLowerCase();
  if (disabledCommands.includes(command.info.name))
    return message.channel.send(
      `That command is already disabled! Did you mean \`${prefix}EnableCommand ${cmd}\``
    );

  if (
    args[0].toLowerCase() === 'disablecommand' ||
    args[0].toLowerCase() === 'enablecommand'
  )
    return message.channel.send("You can't disable that command");

  message.channel.send(
    `Disabled command \`${cmd}\`. Admins can still use the command`
  );
  disableCommand(command, message.guild.id);
};

module.exports.info = {
  name: 'disablecommand',
  alias: [],
  usage: '<p>DisableCommand [Command]',
  example: '<p>DisableCommand Say\n<p>DisableCommand Snipe',
  description:
    'Disable usage of a certain command in the server. Admins can still use the command',
  category: 'admin',
};
