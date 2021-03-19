module.exports.run = (client, message, args) => {
  const cubes = require('scrambler-util');

  let scrambles = args[0];

  if (!scrambles || scrambles == null || scrambles == undefined) scrambles = 1;

  if (isNaN(scrambles))
    return message.channel.send('You need to provide a number');

  var result = cubes('pyra', scrambles).join('\n\n');

  message.channel.send(result);
};

module.exports.info = {
  name: 'Pyraminx',
  alias: [],
  usage: '<p>Pyraminx (amount of scrambles)',
  example: '<p>Pyraminx 5',
  description: 'Generate a scrable for the pyraminx',
  category: 'scramble',
};
