const {endGiveaway} = require('../../Storage/giveaway');

module.exports.run = async (client, message, args, {GuildConfig}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      "You don't have permission to use this command"
    );

  const giveaways = GuildConfig.giveaways;
  const id = args[0];
  if (!id)
    return message.channel.send(
      `You need to provide the id of the giveaway you want to end`
    );
  const giveaway = giveaways.find(g => g.mes == id);
  if (!giveaway)
    return message.channel.send(`Could not find a giveaway with that id`);

  if (giveaway.ended)
    return message.channel.send(`That giveaway has already ended`);

  giveaway.client = client;

  endGiveaway(giveaway);
};

module.exports.info = {
  name: 'giveawayend',
  alias: ['gend'],
  usage: '<p>GiveawayEnd <Giveaway Id>',
  example: '<p>GiveawayEnd 820856988761587752',
  description: 'Ends an on going giveaway and draws a winner',
  category: 'admin',
};
