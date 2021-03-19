module.exports.run = (client, message, args) => {
  const cubes = require('scrambler-util');

  let scrambles = args[0];

  if (!scrambles || scrambles == null || scrambles == undefined) scrambles = 1;

  if (isNaN(scrambles))
    return message.channel.send('You need to provide a number');

  let result = '';
  for (let i = 0; i < scrambles; i++) {
    result += '```\n' + cubes('777', '1') + '\n```';
  }

  message.channel.send(result);
};
module.exports.info = {
  name: '7x7',
  alias: [],
  usage: '<p>7x7 (amount of scrambles)',
  example: '<p>7x7 5',
  description: 'Generate a scrable for the 7x7 cube',
  category: 'scramble',
};
