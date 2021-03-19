module.exports.run = (client, message, args) => {
  const cubes = require('scrambler-util');

  let scrambles = args[0];

  if (!scrambles || scrambles == null || scrambles == undefined) scrambles = 1;

  if (isNaN(scrambles))
    return message.channel.send('You need to provide a number');

  let result = '';
  for (let i = 0; i < scrambles; i++) {
    result += '```\n' + cubes('555', '1') + '\n```';
  }

  message.channel.send(result);
};
module.exports.info = {
  name: '5x5',
  alias: [],
  usage: '<p>5x5 (amount of scrambles)',
  example: '<p>5x5 5',
  description: 'Generate a scrable for the 5x5 cube',
  category: 'scramble',
};
