module.exports.run = (client, message, args) => {
  const cubes = require('scrambler-util');

  let scrambles = args[0];

  if (!scrambles || scrambles == null || scrambles == undefined) scrambles = 1;

  if (isNaN(scrambles))
    return message.channel.send('You need to provide a number');

  var result = cubes('skewb', scrambles).join('\n\n');

  message.channel.send(result);
};

module.exports.info = {
  name: 'skewb',
  alias: [],
  usage: '<p>Skewb (amount of scrambles)',
  example: '<p>Skewb 5',
  description: 'Generate a scrable for the skewb',
  category: 'scramble',
};
