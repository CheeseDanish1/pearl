module.exports.run = (client, message, args) => {
  message.channel.send('( ͡° ͜ʖ ͡°)');

  message.delete();
};

module.exports.info = {
  name: 'lenny',
  alias: ['( ͡° ͜ʖ ͡°)'],
  usage: '<p>Lenny',
  example: '<p>Lenny',
  description: '( ͡° ͜ʖ ͡°)',
  category: 'fun',
};
