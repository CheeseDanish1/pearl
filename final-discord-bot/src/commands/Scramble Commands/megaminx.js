module.exports.run = (client, message, args) => {
  const cubes = require('scrambler-util');

  let scrambles = args[0];

  if (!scrambles || scrambles == null || scrambles == undefined) scrambles = 1;

  if (isNaN(scrambles))
    return message.channel.send('You need to provide a number');

  var result = cubes('mega', scrambles).join('\n\n');

  message.channel.send(result);
};

module.exports.info = {
  name: 'megaminx',
  alias: [],
  usage: '<p>Megaminx (amount of scrambles)',
  example: '<p>Megaminx 5',
  description: 'Generate a scrable for the megaminx',
  category: 'scramble',
};
