const {evaluate} = require('mathjs');

module.exports.run = (client, message, args) => {
  let form = args.join(' ');
  let res = evaluate(form);
  message.channel.send(res);
};

module.exports.info = {
  name: 'calc',
  alias: ['math'],
  usage: '<p>Calc [Expression]',
  example: '<p>Calc 2+2',
  description: 'Perform some basic math calculations',
  category: 'misc',
};
