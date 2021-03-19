module.exports.run = (client, message, args) => {
  message.channel.send({
    files: [
      {
        attachment: 'src/image/scrambler-info.PNG',
        name: 'cubing-info.png',
      },
    ],
  });
};

module.exports.info = {
  name: 'cubinginfo',
  alias: [],
  usage: '<p>Cubinginginfo',
  example: '<p>Cubinginfo',
  description: 'Get the info on scramble generation',
  category: 'scramble',
};
