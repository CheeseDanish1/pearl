module.exports.run = async (client, message, args, {GuildConfig}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(`You dont have permission to use this command`);

  if (!args || !args.length || !args[0])
    return message.channel.send(
      `You need to provide the reaction role id. Do \`>RrList\` for more info`
    );

  const id = args[0];
  const rr = GuildConfig.reactionRoles.find(r => r.MessageId == id);
  if (!rr)
    return message.channel.send('Could not find reaction role with that id');

  await GuildConfig.updateOne({
    $pull: {reactionRoles: {MessageId: rr.MessageId}},
  });
  return message.channel.send(`Removed reaction role with the id ${id}`);
};

module.exports.info = {
  name: 'rrremove',
  alias: ['reactionroleremove'],
  usage: '<p>RrRemove <Message Id>',
  example: '<p>Rrlist 833380833699692585',
  description: 'Remove a set up reaction role',
  category: 'admin',
};
