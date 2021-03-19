const ms = require('ms');
const prettyMilliseconds = require('pretty-ms');

module.exports.run = (client, message, args, {prefix}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send(
      "You don't have permission to use this command"
    );

  let channel = message.mentions.channels.first() || message.channel;

  if (!args[1])
    return message.channel.send(
      `Please provide the time you would like to set channel slowmode to`
    );
  let time = ms(args[1]);

  let cooltime = prettyMilliseconds(time, {
    compact: true,
  });
  let mstosec = time / 1000;
  if (mstosec > 21600)
    return message.channel.send(`The time you put in is too large`);
  channel
    .setRateLimitPerUser(mstosec)
    .catch(err => message.channel.send('Error \n' + err));
  message.channel.send(`Set the slowmode of ${channel} too **${cooltime}**`);
};

module.exports.info = {
  name: 'slowmode',
  alias: [],
  usage: '<p>Slowmode [Channel] [Time]',
  example: '<p>Slowmode #general 10s',
  description: 'Change a channels slowmode',
  category: 'moderation',
};
