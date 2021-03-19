module.exports.run = (client, message, args) => {
  const cubes = require('scrambler-util');

  let scrambles = args[0];

  if (!scrambles || scrambles == null || scrambles == undefined) scrambles = 1;

  if (isNaN(scrambles))
    return message.channel.send('You need to provide a number');

  var result = cubes('444', scrambles).join('\n\n\n');

  message.channel.send(result);
};
module.exports.info = {
  name: '4x4',
  alias: [],
  usage: '<p>4x4 (amount of scrambles)',
  example: '<p>4x4 5',
  description: 'Generate a scrable for the 4x4 cube',
  category: 'scramble',
};
