module.exports.run = (client, message, args) => {
  const cubes = require('scrambler-util');

  let scrambles = args[0];

  if (!scrambles) scrambles = 1;

  if (isNaN(scrambles))
    return message.channel.send('You need to provide a number');

  var result = cubes('333', scrambles).join('\n\n');

  message.channel.send(result);
};
module.exports.info = {
  name: '3x3',
  alias: [],
  usage: '<p>3x3 (amount of scrambles)',
  example: '<p>3x3 5',
  description: 'Generate a scrable for the 3x3 cube',
  category: 'scramble',
};
