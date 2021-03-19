const {drawWinner} = require('../../Storage/giveaway');

module.exports.run = async (client, message, args, {GuildConfig}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(`You dont have permission to use this command`);
  const id = args[0];
  if (!id)
    return message.channel.send(
      `You need to provide the message id of the giveaway you want to reroll`
    );
  const giveaway = GuildConfig.giveaways.find(g => g.mes == id);
  if (!giveaway) return message.channel.send(`Giveaway not found`);
  if (!giveaway.ended)
    return message.channel.send(`That giveaway did not end yet`);

  let guild = client.guilds.cache.get(giveaway.guild);
  let channel = guild.channels.cache.get(giveaway.channel);
  let givMessage = await channel.messages.fetch(giveaway.mes, true, true);

  let winner = await drawWinner({message: givMessage});
  return message.channel.send(
    `The new winner of **${giveaway.prize}** is... ${winner}`
  );
};

module.exports.info = {
  name: 'reroll',
  alias: [],
  usage: '<p>Reroll [Message Id]',
  example: '<p>Reroll 822332032327090207',
  description: 'Reroll a giveaway that already finished',
  category: 'admin',
};
