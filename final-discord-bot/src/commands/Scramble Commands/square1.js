module.exports.run = (client, message, args) => {
  const cubes = require('scrambler-util');

  let scrambles = args[0];

  if (!scrambles || scrambles == null || scrambles == undefined) scrambles = 1;

  if (isNaN(scrambles))
    return message.channel.send('You need to provide a number');

  var result = cubes('sq1', scrambles).join('\n\n');

  message.channel.send(result);
};

module.exports.info = {
  name: 'square1',
  alias: ['squan', 'sq1', 'sq-1', 'Square-1'],
  usage: '<p>Square1 (amount of scrambles)',
  example: '<p>Square1 5',
  description: 'Generate a scrable for the square 1',
  category: 'scramble',
};
