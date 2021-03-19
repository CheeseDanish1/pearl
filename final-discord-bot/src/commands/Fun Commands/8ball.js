const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  let answers = [
    'As I see it, yes.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don’t count on it.',
    'It is certain.',
    'It is decidedly so.',
    'Most likely.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Outlook good.',
    'Reply hazy, try again.',
    'Signs point to yes.',
    'Very doubtful.',
    'Without a doubt.',
    'Yes.',
    'Yes – definitely.',
    'You may rely on it.',
  ];

  let response = answers[Math.floor(Math.random() * answers.length - 1)];

  let question = args.join(' ');

  if (!question) return message.channel.send('You did not ask me anything');

  message.channel.send(response);
};

module.exports.info = {
  name: '8ball',
  alias: [],
  usage: '<p>8ball',
  example: '<p>8ball',
  description: 'Dont know what to do? Ask the 8ball and get a responce!',
  category: 'fun',
};
