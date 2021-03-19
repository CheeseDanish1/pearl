module.exports.run = (client, message, args) => {
  const cubes = require('scrambler-util');

  let scrambles = args[0];

  if (!scrambles || scrambles == null || scrambles == undefined) scrambles = 1;

  if (isNaN(scrambles))
    return message.channel.send('You need to provide a number');

  var result = cubes('111', scrambles).join('\n\n');

  message.channel.send(result);
};

module.exports.info = {
  name: '1x1',
  alias: [],
  usage: '<p>1x1 (amount of scrambles)',
  example: '<p>1x1 5',
  description: 'Generate a scrable for the 1x1 cube',
  category: 'scramble',
};
